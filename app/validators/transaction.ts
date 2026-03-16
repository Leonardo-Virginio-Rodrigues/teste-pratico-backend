import vine from '@vinejs/vine'

export const createTransactionValidator = vine.create({
  name: vine.string().trim().maxLength(150),

  email: vine.string().trim().email(),

  productId: vine.number().positive(),

  quantity: vine.number().positive(),

  cardNumber: vine.string().trim().fixedLength(16),

  cvv: vine.string().trim().fixedLength(3),
})
