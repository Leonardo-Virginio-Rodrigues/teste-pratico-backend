/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  auth: {
    auth: {
      login: typeof routes['auth.auth.login']
      logout: typeof routes['auth.auth.logout']
    }
  }
  users: {
    users: {
      signup: typeof routes['users.users.signup']
    }
  }
}
