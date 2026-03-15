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
      findAll: typeof routes['users.users.find_all']
      findOne: typeof routes['users.users.find_one']
      updateOne: typeof routes['users.users.update_one']
      deleteOne: typeof routes['users.users.delete_one']
    }
  }
}
