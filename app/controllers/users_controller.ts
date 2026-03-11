import User from '#models/user'
import { signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'

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
}
