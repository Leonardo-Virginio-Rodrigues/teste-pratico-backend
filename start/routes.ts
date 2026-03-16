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

    // Products
    router
      .group(() => {
        router
          .post('', [controllers.Products, 'create'])
          .use(middleware.auth())
          .use(middleware.role([ROLES.ADMIN, ROLES.MANAGER, ROLES.FINANCE]))
        router
          .get('', [controllers.Products, 'findAll'])
          .use(middleware.auth())
          .use(middleware.role([ROLES.ADMIN, ROLES.MANAGER, ROLES.FINANCE]))
        router
          .get(':id', [controllers.Products, 'findOne'])
          .use(middleware.auth())
          .use(middleware.role([ROLES.ADMIN, ROLES.MANAGER, ROLES.FINANCE]))
        router
          .patch(':id', [controllers.Products, 'updateOne'])
          .use(middleware.auth())
          .use(middleware.role([ROLES.ADMIN, ROLES.MANAGER, ROLES.FINANCE]))
        router
          .delete(':id', [controllers.Products, 'deleteOne'])
          .use(middleware.auth())
          .use(middleware.role([ROLES.ADMIN, ROLES.MANAGER, ROLES.FINANCE]))
      })
      .prefix('products')
      .as('products')

    // Gateways
    router
      .group(() => {
        router
          .get('', [controllers.Gateways, 'findAll'])
          .use(middleware.auth())
          .use(middleware.role([ROLES.ADMIN]))
        router
          .patch(':id/status', [controllers.Gateways, 'updateStatus'])
          .use(middleware.auth())
          .use(middleware.role([ROLES.ADMIN]))
        router
          .patch(':id/priority', [controllers.Gateways, 'updatePriority'])
          .use(middleware.auth())
          .use(middleware.role([ROLES.ADMIN]))
      })
      .prefix('gateways')
      .as('gateways')

    // Transactions
    router
      .group(() => {
        router.post('store', [controllers.Transactions, 'store'])
        router
          .post(':id/refund', [controllers.Transactions, 'refund'])
          .use(middleware.auth())
          .use(middleware.role([ROLES.ADMIN, ROLES.FINANCE]))
        router
          .get('', [controllers.Transactions, 'findAll'])
          .use(middleware.auth())
          .use(middleware.role([ROLES.ADMIN, ROLES.USER]))
        router
          .get(':id', [controllers.Transactions, 'findOne'])
          .use(middleware.auth())
          .use(middleware.role([ROLES.ADMIN, ROLES.USER]))
      })
      .prefix('transactions')
      .as('transactions')

    // Clients
    router
      .group(() => {
        router
          .get(':id', [controllers.Clients, 'findOne'])
          .use(middleware.auth())
          .use(middleware.role([ROLES.ADMIN, ROLES.USER]))
        router
          .get('', [controllers.Clients, 'findAll'])
          .use(middleware.auth())
          .use(middleware.role([ROLES.ADMIN, ROLES.USER]))
      })
      .prefix('clients')
      .as('clients')
  })
  .prefix('/api/v1')
