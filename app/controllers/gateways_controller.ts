import Gateway from '#models/gateway'
import { updatePriorityGatewayValidator, updateStatusGatewayValidator } from '#validators/gateway'
import type { HttpContext } from '@adonisjs/core/http'

export default class GatewaysController {
  async findAll() {
    const gateways = await Gateway.query().orderBy('priority', 'asc')
    return gateways
  }

  async updateStatus({ params, request, response }: HttpContext) {
    const { isActive } = await request.validateUsing(updateStatusGatewayValidator)

    const gateway = await Gateway.find(params.id)

    if (!gateway) {
      return response.notFound({ message: 'Gateway not found' })
    }

    gateway.isActive = isActive
    await gateway.save()

    return gateway
  }

  async updatePriority({ params, request, response }: HttpContext) {
    const { priority } = await request.validateUsing(updatePriorityGatewayValidator)

    const gateway = await Gateway.find(params.id)

    if (!gateway) {
      return response.notFound({ message: 'Gateway not found' })
    }

    gateway.priority = priority
    await gateway.save()

    return gateway
  }
}
