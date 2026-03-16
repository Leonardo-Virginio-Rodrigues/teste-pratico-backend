export type ChargeInput = {
  amount: number
  name: string
  email: string
  cardNumber: string
  cvv: string
}

export type ChargeResult = {
  success: boolean
  externalId?: string | null
  status?: string
  rawResponse?: unknown
  error?: string
}

export type RefundResult = {
  success: boolean
  rawResponse?: unknown
  error?: string
}

export type AuthenticateOptions = {
  email: string
  token: string
}
