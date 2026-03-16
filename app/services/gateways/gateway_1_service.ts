import { type ChargeInput, type ChargeResult, type RefundResult } from './types.ts'

export default class Gateway1Service {
  constructor(private baseUrl: string) {}

  private async authenticate(): Promise<string> {
    const response = await fetch(`${this.baseUrl}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'dev@betalent.tech',
        token: 'FEC9BB078BF338F464F96B48089EB498',
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`Gateway 1 auth failed: ${errorBody}`)
    }

    const data = await response.json()
    return data.token
  }

  async charge(payload: ChargeInput): Promise<ChargeResult> {
    try {
      const token = await this.authenticate()

      const response = await fetch(`${this.baseUrl}/transactions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          amount: payload.amount,
          name: payload.name,
          email: payload.email,
          cardNumber: payload.cardNumber,
          cvv: payload.cvv,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        return {
          success: false,
          error: 'Gateway 1 charge failed',
          rawResponse: data,
        }
      }
      console.log(data)

      return {
        success: true,
        externalId: data.id || null,
        status: 'APPROVED',
        rawResponse: data,
      }
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Gateway 1 charge failed',
      }
    }
  }

  async refund(externalId: string): Promise<RefundResult> {
    try {
      const token = await this.authenticate()

      const response = await fetch(`${this.baseUrl}/transactions/${externalId}/charge_back`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
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
          error: (data as { message?: string } | null)?.message || 'Gateway 1 refund failed',
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
        error: error instanceof Error ? error.message : 'Gateway 1 refund failed',
      }
    }
  }
}
