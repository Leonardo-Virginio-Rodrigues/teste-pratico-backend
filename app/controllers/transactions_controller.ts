import type { HttpContext } from '@adonisjs/core/http'
import Product from '#models/product'
import { createTransactionValidator } from '#validators/transaction'
import Client from '#models/client'
import PaymentService from '#services/payment/payment_service'
import Transaction from '#models/transaction'
import TransactionProduct from '#models/transaction_product'

export default class TransactionsController {
  private paymentService: PaymentService

  constructor() {
    this.paymentService = new PaymentService()
  }

  async store({ request, response }: HttpContext) {
    const payload = await request.validateUsing(createTransactionValidator)

    const { name, email, productId, quantity, cardNumber, cvv } = payload

    const product = await Product.find(productId)

    if (!product) {
      return response.notFound({
        message: 'Product not found',
      })
    }

    const unitAmount = Number(product.amount)
    const totalAmount = unitAmount * quantity

    // gateways works with cents
    const amountInCents = Math.round(totalAmount * 100)

    let client = await Client.findBy('email', email)

    if (!client) {
      client = await Client.create({
        name,
        email,
      })
    }

    const paymentResult = await this.paymentService.processPayment({
      amount: amountInCents,
      name,
      email,
      cardNumber,
      cvv,
    })

    if (!paymentResult.success) {
      return response.badRequest({
        message: 'Payment failed',
        errors: paymentResult.errors,
      })
    }

    const transaction = await Transaction.create({
      clientId: client.id,
      gatewayId: paymentResult.gatewayId,
      externalId: paymentResult.externalId,
      status: 'APPROVED',
      amount: totalAmount,
      cardLastNumbers: cardNumber.slice(-4),
    })

    await TransactionProduct.create({
      transactionId: transaction.id,
      productId: product.id,
      quantity,
      unitAmount,
      totalAmount,
    })

    return {
      message: 'Transaction successful',
      data: transaction,
    }
  }

  async refund({ params, response }: HttpContext) {
    const transaction = await Transaction.find(params.id)

    if (!transaction) {
      return response.notFound({
        message: 'Transaction not found',
      })
    }

    if (transaction.status === 'REFUNDED') {
      return response.badRequest({
        message: 'Transaction has already been refunded',
      })
    }

    if (transaction.status !== 'APPROVED') {
      return response.badRequest({
        message: 'Only approved transactions can be refunded',
      })
    }

    const refundResult = await this.paymentService.refundPayment({
      externalId: transaction.externalId,
      gatewayId: transaction.gatewayId,
    })

    if (!refundResult.success) {
      return response.badRequest({
        message: refundResult.error || 'Refund failed',
      })
    }

    transaction.status = 'REFUNDED'
    await transaction.save()

    return {
      message: 'Refund processed successfully',
      data: transaction,
    }
  }

  async findAll() {
    const transactions = await Transaction.query()
    return transactions
  }

  async findOne({ params, response }: HttpContext) {
    const transaction = await Transaction.query()
      .where('id', params.id)
      .preload('client')
      .preload('gateway')
      .preload('products', (query) => {
        query.preload('product')
      })
      .first()

    if (!transaction) {
      return response.notFound({
        message: 'Transaction not found',
      })
    }

    return transaction
  }
}
