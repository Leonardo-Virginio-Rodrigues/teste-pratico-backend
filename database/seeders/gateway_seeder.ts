import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Gateway from '#models/gateway'

export default class GatewaySeeder extends BaseSeeder {
  async run() {
    const gateway1 = await Gateway.findBy('name', 'gateway_1')

    if (!gateway1) {
      await Gateway.create({
        name: 'gateway_1',
        isActive: true,
        priority: 1,
        baseUrl: 'http://gateways-mock:3001',
      })
    }

    const gateway2 = await Gateway.findBy('name', 'gateway_2')

    if (!gateway2) {
      await Gateway.create({
        name: 'gateway_2',
        isActive: true,
        priority: 2,
        baseUrl: 'http://gateways-mock:3002',
      })
    }
  }
}
