import type { HttpContext } from '@adonisjs/core/http'
import { type UserRole } from '../constants/roles.ts'

export default class RoleMiddleware {
  async handle(ctx: HttpContext, next: () => Promise<void>, allowedRoles: UserRole[]) {
    const user = ctx.auth.user

    if (!user) {
      return ctx.response.unauthorized({
        message: 'User not authenticated',
      })
    }

    if (!allowedRoles.includes(user.role as UserRole)) {
      return ctx.response.forbidden({
        message: 'You do not have permission to access this resource',
      })
    }

    await next()
  }
}
