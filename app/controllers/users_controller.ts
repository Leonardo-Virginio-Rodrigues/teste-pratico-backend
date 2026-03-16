import User from '#models/user'
import { signupValidator, updateOneValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'
import { ROLES } from '../constants/roles.ts'

export default class UsersController {
  async signup({ request, serialize }: HttpContext) {
    const { name, email, role, password } = await request.validateUsing(signupValidator)

    const user = await User.create({ name, email, role, password })
    const token = await User.accessTokens.create(user)

    return serialize({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    })
  }

  async findAll() {
    const users = await User.query()

    return users
  }

  async findOne({ params, response }: HttpContext) {
    const user = await User.find(params.id)

    if (!user) {
      return response.notFound({
        message: 'User not found',
      })
    }

    return user
  }

  async updateOne({ params, response, request }: HttpContext) {
    const userDto = await request.validateUsing(updateOneValidator)

    const user = await User.find(params.id)

    if (!user) {
      return response.notFound({
        message: 'User not found',
      })
    }

    const userUpdate = { ...user, ...userDto }

    user.merge(userUpdate)

    await user.save()

    return user
  }

  async deleteOne({ params, response }: HttpContext) {
    const user = await User.find(params.id)

    if (!user) {
      return response.notFound({
        message: 'User not found',
      })
    }

    if (user.role === ROLES.ADMIN) {
      return response.unauthorized({ message: 'This user is ADMIN and cannot be removed' })
    }

    await user.delete()

    return { data: 'user has been remove' }
  }
}
