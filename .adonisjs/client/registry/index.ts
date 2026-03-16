/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'auth.auth.login': {
    methods: ["POST"],
    pattern: '/api/v1/auth/login',
    tokens: [{"old":"/api/v1/auth/login","type":0,"val":"api","end":""},{"old":"/api/v1/auth/login","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/login","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/login","type":0,"val":"login","end":""}],
    types: placeholder as Registry['auth.auth.login']['types'],
  },
  'auth.auth.logout': {
    methods: ["POST"],
    pattern: '/api/v1/auth/logout',
    tokens: [{"old":"/api/v1/auth/logout","type":0,"val":"api","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"v1","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"auth","end":""},{"old":"/api/v1/auth/logout","type":0,"val":"logout","end":""}],
    types: placeholder as Registry['auth.auth.logout']['types'],
  },
  'users.users.signup': {
    methods: ["POST"],
    pattern: '/api/v1/users/signup',
    tokens: [{"old":"/api/v1/users/signup","type":0,"val":"api","end":""},{"old":"/api/v1/users/signup","type":0,"val":"v1","end":""},{"old":"/api/v1/users/signup","type":0,"val":"users","end":""},{"old":"/api/v1/users/signup","type":0,"val":"signup","end":""}],
    types: placeholder as Registry['users.users.signup']['types'],
  },
  'users.users.find_all': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/users',
    tokens: [{"old":"/api/v1/users","type":0,"val":"api","end":""},{"old":"/api/v1/users","type":0,"val":"v1","end":""},{"old":"/api/v1/users","type":0,"val":"users","end":""}],
    types: placeholder as Registry['users.users.find_all']['types'],
  },
  'users.users.find_one': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/users/:id',
    tokens: [{"old":"/api/v1/users/:id","type":0,"val":"api","end":""},{"old":"/api/v1/users/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/users/:id","type":0,"val":"users","end":""},{"old":"/api/v1/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.users.find_one']['types'],
  },
  'users.users.update_one': {
    methods: ["PATCH"],
    pattern: '/api/v1/users/:id',
    tokens: [{"old":"/api/v1/users/:id","type":0,"val":"api","end":""},{"old":"/api/v1/users/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/users/:id","type":0,"val":"users","end":""},{"old":"/api/v1/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.users.update_one']['types'],
  },
  'users.users.delete_one': {
    methods: ["DELETE"],
    pattern: '/api/v1/users/:id',
    tokens: [{"old":"/api/v1/users/:id","type":0,"val":"api","end":""},{"old":"/api/v1/users/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/users/:id","type":0,"val":"users","end":""},{"old":"/api/v1/users/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['users.users.delete_one']['types'],
  },
  'products.products.create': {
    methods: ["POST"],
    pattern: '/api/v1/products',
    tokens: [{"old":"/api/v1/products","type":0,"val":"api","end":""},{"old":"/api/v1/products","type":0,"val":"v1","end":""},{"old":"/api/v1/products","type":0,"val":"products","end":""}],
    types: placeholder as Registry['products.products.create']['types'],
  },
  'products.products.find_all': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/products',
    tokens: [{"old":"/api/v1/products","type":0,"val":"api","end":""},{"old":"/api/v1/products","type":0,"val":"v1","end":""},{"old":"/api/v1/products","type":0,"val":"products","end":""}],
    types: placeholder as Registry['products.products.find_all']['types'],
  },
  'products.products.find_one': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/products/:id',
    tokens: [{"old":"/api/v1/products/:id","type":0,"val":"api","end":""},{"old":"/api/v1/products/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/products/:id","type":0,"val":"products","end":""},{"old":"/api/v1/products/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['products.products.find_one']['types'],
  },
  'products.products.update_one': {
    methods: ["PATCH"],
    pattern: '/api/v1/products/:id',
    tokens: [{"old":"/api/v1/products/:id","type":0,"val":"api","end":""},{"old":"/api/v1/products/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/products/:id","type":0,"val":"products","end":""},{"old":"/api/v1/products/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['products.products.update_one']['types'],
  },
  'products.products.delete_one': {
    methods: ["DELETE"],
    pattern: '/api/v1/products/:id',
    tokens: [{"old":"/api/v1/products/:id","type":0,"val":"api","end":""},{"old":"/api/v1/products/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/products/:id","type":0,"val":"products","end":""},{"old":"/api/v1/products/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['products.products.delete_one']['types'],
  },
  'gateways.gateways.find_all': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/gateways',
    tokens: [{"old":"/api/v1/gateways","type":0,"val":"api","end":""},{"old":"/api/v1/gateways","type":0,"val":"v1","end":""},{"old":"/api/v1/gateways","type":0,"val":"gateways","end":""}],
    types: placeholder as Registry['gateways.gateways.find_all']['types'],
  },
  'gateways.gateways.update_status': {
    methods: ["PATCH"],
    pattern: '/api/v1/gateways/:id/status',
    tokens: [{"old":"/api/v1/gateways/:id/status","type":0,"val":"api","end":""},{"old":"/api/v1/gateways/:id/status","type":0,"val":"v1","end":""},{"old":"/api/v1/gateways/:id/status","type":0,"val":"gateways","end":""},{"old":"/api/v1/gateways/:id/status","type":1,"val":"id","end":""},{"old":"/api/v1/gateways/:id/status","type":0,"val":"status","end":""}],
    types: placeholder as Registry['gateways.gateways.update_status']['types'],
  },
  'gateways.gateways.update_priority': {
    methods: ["PATCH"],
    pattern: '/api/v1/gateways/:id/priority',
    tokens: [{"old":"/api/v1/gateways/:id/priority","type":0,"val":"api","end":""},{"old":"/api/v1/gateways/:id/priority","type":0,"val":"v1","end":""},{"old":"/api/v1/gateways/:id/priority","type":0,"val":"gateways","end":""},{"old":"/api/v1/gateways/:id/priority","type":1,"val":"id","end":""},{"old":"/api/v1/gateways/:id/priority","type":0,"val":"priority","end":""}],
    types: placeholder as Registry['gateways.gateways.update_priority']['types'],
  },
  'transactions.transactions.store': {
    methods: ["POST"],
    pattern: '/api/v1/transactions/store',
    tokens: [{"old":"/api/v1/transactions/store","type":0,"val":"api","end":""},{"old":"/api/v1/transactions/store","type":0,"val":"v1","end":""},{"old":"/api/v1/transactions/store","type":0,"val":"transactions","end":""},{"old":"/api/v1/transactions/store","type":0,"val":"store","end":""}],
    types: placeholder as Registry['transactions.transactions.store']['types'],
  },
  'transactions.transactions.refund': {
    methods: ["POST"],
    pattern: '/api/v1/transactions/:id/refund',
    tokens: [{"old":"/api/v1/transactions/:id/refund","type":0,"val":"api","end":""},{"old":"/api/v1/transactions/:id/refund","type":0,"val":"v1","end":""},{"old":"/api/v1/transactions/:id/refund","type":0,"val":"transactions","end":""},{"old":"/api/v1/transactions/:id/refund","type":1,"val":"id","end":""},{"old":"/api/v1/transactions/:id/refund","type":0,"val":"refund","end":""}],
    types: placeholder as Registry['transactions.transactions.refund']['types'],
  },
  'transactions.transactions.find_all': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/transactions',
    tokens: [{"old":"/api/v1/transactions","type":0,"val":"api","end":""},{"old":"/api/v1/transactions","type":0,"val":"v1","end":""},{"old":"/api/v1/transactions","type":0,"val":"transactions","end":""}],
    types: placeholder as Registry['transactions.transactions.find_all']['types'],
  },
  'transactions.transactions.find_one': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/transactions/:id',
    tokens: [{"old":"/api/v1/transactions/:id","type":0,"val":"api","end":""},{"old":"/api/v1/transactions/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/transactions/:id","type":0,"val":"transactions","end":""},{"old":"/api/v1/transactions/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['transactions.transactions.find_one']['types'],
  },
  'clients.clients.find_one': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/clients/:id',
    tokens: [{"old":"/api/v1/clients/:id","type":0,"val":"api","end":""},{"old":"/api/v1/clients/:id","type":0,"val":"v1","end":""},{"old":"/api/v1/clients/:id","type":0,"val":"clients","end":""},{"old":"/api/v1/clients/:id","type":1,"val":"id","end":""}],
    types: placeholder as Registry['clients.clients.find_one']['types'],
  },
  'clients.clients.find_all': {
    methods: ["GET","HEAD"],
    pattern: '/api/v1/clients',
    tokens: [{"old":"/api/v1/clients","type":0,"val":"api","end":""},{"old":"/api/v1/clients","type":0,"val":"v1","end":""},{"old":"/api/v1/clients","type":0,"val":"clients","end":""}],
    types: placeholder as Registry['clients.clients.find_all']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
