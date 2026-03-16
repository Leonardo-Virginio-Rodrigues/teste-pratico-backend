export type ProcessPaymentInput = {
  amount: number
  name: string
  email: string
  cardNumber: string
  cvv: string
}

export type ProcessPaymentResult = {
  success: boolean
  gatewayId?: number | null
  gatewayName?: string | null
  externalId?: string | null
  status?: string
  rawResponse?: unknown
  error?: string
  errors?: Array<{
    gatewayId: number
    gatewayName: string
    error: string
  }>
}

export type RefundPaymentResult = {
  success: boolean
  rawResponse?: unknown
  error?: string
}
