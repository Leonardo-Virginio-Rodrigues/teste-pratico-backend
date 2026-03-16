import { type ChargeInput, type ChargeResult, type RefundResult } from './types.ts'

export default class Gateway2Service {
  constructor(private baseUrl: string) {}

  private getHeaders() {
    return {
      'Content-Type': 'application/json',
      'Gateway-Auth-Token': 'tk_f2198cc671b5289fa856',
      'Gateway-Auth-Secret': '3d15e8ed6131446ea7e3456728b1211f',
    }
  }

  async charge(payload: ChargeInput): Promise<ChargeResult> {
    try {
      const response = await fetch(`${this.baseUrl}/transacoes`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          valor: payload.amount,
          nome: payload.name,
          email: payload.email,
          numeroCartao: payload.cardNumber,
          cvv: payload.cvv,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: 'Gateway 2 charge failed',
          rawResponse: data,
        }
      }

      return {
        success: true,
        externalId: data?.id ?? null,
        status: 'APPROVED',
        rawResponse: data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Gateway 2 charge failed',
      }
    }
  }

  async refund(externalId: string): Promise<RefundResult> {
    try {
      const response = await fetch(`${this.baseUrl}/transacoes/reembolso`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify({
          id: externalId,
        }),
      })

      let data: unknown = null

      try {
        data = await response.json()
      } catch {
        data = null
      }

      if (!response.ok) {
        return {
          success: false,
          error: (data as { message?: string } | null)?.message || 'Gateway 2 refund failed',
          rawResponse: data,
        }
      }

      return {
        success: true,
        rawResponse: data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Gateway 2 refund failed',
      }
    }
  }
}
