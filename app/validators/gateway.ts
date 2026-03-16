import vine from '@vinejs/vine'

export const updateStatusGatewayValidator = vine.create({
  isActive: vine.boolean(),
})

export const updatePriorityGatewayValidator = vine.create({
  priority: vine.number(),
})
