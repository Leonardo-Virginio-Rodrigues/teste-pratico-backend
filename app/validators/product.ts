import vine from '@vinejs/vine'

export const createProductValidator = vine.create({
  name: vine.string().trim().maxLength(150),

  amount: vine.number().positive(),

  isActive: vine.boolean().optional(),
})

export const updateOneProductValidator = vine.create({
  name: vine.string().trim().maxLength(150).optional(),

  amount: vine.number().positive().optional(),

  isActive: vine.boolean().optional(),
})
