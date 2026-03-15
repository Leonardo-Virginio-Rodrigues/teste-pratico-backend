/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import { middleware } from '#start/kernel'
import router from '@adonisjs/core/services/router'
import { controllers } from '#generated/controllers'
import { ROLES } from '../app/constants/roles.ts'

router.get('/', () => {
  return { hello: 'world' }
})

router
  .group(() => {
    // Auth
    router
      .group(() => {
        router.post('login', [controllers.Auth, 'login'])
        router.post('logout', [controllers.Auth, 'logout']).use(middleware.auth())
      })
      .prefix('auth')
      .as('auth')

    // User
    router
      .group(() => {
        router
          .post('signup', [controllers.Users, 'signup'])
          .use(middleware.auth())
          .use(middleware.role([ROLES.ADMIN]))
        router
          .get('', [controllers.Users, 'findAll'])
          .use(middleware.auth())
          .use(middleware.role([ROLES.ADMIN, ROLES.MANAGER]))
        router
          .get(':id', [controllers.Users, 'findOne'])
          .use(middleware.auth())
          .use(middleware.role([ROLES.ADMIN, ROLES.MANAGER]))
        router
          .patch(':id', [controllers.Users, 'updateOne'])
          .use(middleware.auth())
          .use(middleware.role([ROLES.ADMIN, ROLES.MANAGER]))
        router
          .delete(':id', [controllers.Users, 'deleteOne'])
          .use(middleware.auth())
          .use(middleware.role([ROLES.ADMIN, ROLES.MANAGER]))
      })
      .prefix('users')
      .as('users')
  })
  .prefix('/api/v1')
