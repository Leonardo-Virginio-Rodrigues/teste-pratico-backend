import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.auth.login': { paramsTuple?: []; params?: {} }
    'auth.auth.logout': { paramsTuple?: []; params?: {} }
    'users.users.signup': { paramsTuple?: []; params?: {} }
  }
  GET: {
  }
  HEAD: {
  }
  POST: {
    'auth.auth.login': { paramsTuple?: []; params?: {} }
    'auth.auth.logout': { paramsTuple?: []; params?: {} }
    'users.users.signup': { paramsTuple?: []; params?: {} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}