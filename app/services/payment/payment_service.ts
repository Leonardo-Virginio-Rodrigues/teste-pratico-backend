import Gateway from '#models/gateway'
import Gateway1Service from '#services/gateways/gateway_1_service'
import Gateway2Service from '#services/gateways/gateway_2_service'
import {
  type RefundPaymentResult,
  type ProcessPaymentInput,
  type ProcessPaymentResult,
} from '#services/payment/types'

export default class PaymentService {
  private resolveGatewayProvider(gateway: Gateway) {
    switch (gateway.name) {
      case 'gateway_1':
        return new Gateway1Service(gateway.baseUrl)

      case 'gateway_2':
        return new Gateway2Service(gateway.baseUrl)

      default:
        return null
    }
  }

  async processPayment(payload: ProcessPaymentInput): Promise<ProcessPaymentResult> {
    const gateways = await Gateway.query().where('is_active', true).orderBy('priority', 'asc')

    if (!gateways.length) {
      return {
        success: false,
        error: 'No active gateways available',
      }
    }

    const errors: Array<{
      gatewayId: number
      gatewayName: string
      error: string
    }> = []

    for (const gateway of gateways) {
      const provider = this.resolveGatewayProvider(gateway)

      if (!provider) {
        errors.push({
          gatewayId: gateway.id,
          gatewayName: gateway.name,
          error: 'Gateway provider not implemented',
        })
        continue
      }

      const result = await provider.charge(payload)

      if (result.success) {
        return {
          success: true,
          gatewayId: gateway.id,
          gatewayName: gateway.name,
          externalId: result.externalId ?? null,
          status: result.status ?? 'APPROVED',
          rawResponse: result.rawResponse,
        }
      }

      errors.push({
        gatewayId: gateway.id,
        gatewayName: gateway.name,
        error: result.error ?? 'Unknown gateway error',
      })
    }

    return {
      success: false,
      error: 'All gateways failed',
      errors,
    }
  }

  async refundPayment(transaction: {
    externalId: string | null
    gatewayId: number | null
  }): Promise<RefundPaymentResult> {
    if (!transaction.externalId) {
      return {
        success: false,
        error: 'Transaction does not have an external ID',
      }
    }

    if (!transaction.gatewayId) {
      return {
        success: false,
        error: 'Transaction does not have a gateway',
      }
    }

    const gateway = await Gateway.find(transaction.gatewayId)

    if (!gateway) {
      return {
        success: false,
        error: 'Gateway not found',
      }
    }

    if (!gateway.isActive) {
      return {
        success: false,
        error: 'Gateway is inactive',
      }
    }

    const provider = this.resolveGatewayProvider(gateway)

    if (!provider) {
      return {
        success: false,
        error: 'Gateway provider not implemented',
      }
    }

    const result = await provider.refund(transaction.externalId)

    if (!result.success) {
      return {
        success: false,
        error: result.error ?? 'Refund failed',
        rawResponse: result.rawResponse,
      }
    }

    return {
      success: true,
      rawResponse: result.rawResponse,
    }
  }
}
