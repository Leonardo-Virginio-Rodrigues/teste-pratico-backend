import type { HttpContext } from '@adonisjs/core/http'
import Client from '#models/client'

export default class ClientsController {
  async findOne({ params, response }: HttpContext) {
    const client = await Client.query()
      .where('id', params.id)
      .preload('transactions', (transactionsQuery) => {
        transactionsQuery.preload('gateway').preload('products', (productsQuery) => {
          productsQuery.preload('product')
        })
      })
      .first()

    if (!client) {
      return response.notFound({
        message: 'Client not found',
      })
    }

    return client
  }

  async findAll() {
    const clients = await Client.query()
    return clients
  }
}
