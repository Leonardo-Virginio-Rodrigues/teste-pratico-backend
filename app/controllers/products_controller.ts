import Product from '#models/product'
import { createProductValidator, updateOneProductValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProductsController {
  async create({ request }: HttpContext) {
    const { name, amount, isActive } = await request.validateUsing(createProductValidator)

    const product = await Product.create({ name, amount, isActive })

    return product
  }

  async findAll() {
    const products = await Product.query()

    return products
  }

  async findOne({ params, response }: HttpContext) {
    const product = await Product.find(params.id)

    if (!product) {
      return response.notFound({
        message: 'Product not found',
      })
    }

    return product
  }

  async updateOne({ params, response, request }: HttpContext) {
    const productDto = await request.validateUsing(updateOneProductValidator)

    const product = await Product.find(params.id)

    if (!product) {
      return response.notFound({
        message: 'Product not found',
      })
    }

    const userUpdate = { ...product, ...productDto }

    product.merge(userUpdate)

    await product.save()

    return product
  }

  async deleteOne({ params, response }: HttpContext) {
    const product = await Product.find(params.id)

    if (!product) {
      return response.notFound({
        message: 'Product not found',
      })
    }

    await product.delete()

    return { data: 'product has been remove' }
  }
}
