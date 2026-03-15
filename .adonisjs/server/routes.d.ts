import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'auth.auth.login': { paramsTuple?: []; params?: {} }
    'auth.auth.logout': { paramsTuple?: []; params?: {} }
    'users.users.signup': { paramsTuple?: []; params?: {} }
    'users.users.find_all': { paramsTuple?: []; params?: {} }
    'users.users.find_one': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.users.update_one': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'users.users.delete_one': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.products.create': { paramsTuple?: []; params?: {} }
    'products.products.find_all': { paramsTuple?: []; params?: {} }
    'products.products.find_one': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.products.update_one': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.products.delete_one': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  GET: {
    'users.users.find_all': { paramsTuple?: []; params?: {} }
    'users.users.find_one': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.products.find_all': { paramsTuple?: []; params?: {} }
    'products.products.find_one': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  HEAD: {
    'users.users.find_all': { paramsTuple?: []; params?: {} }
    'users.users.find_one': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.products.find_all': { paramsTuple?: []; params?: {} }
    'products.products.find_one': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  POST: {
    'auth.auth.login': { paramsTuple?: []; params?: {} }
    'auth.auth.logout': { paramsTuple?: []; params?: {} }
    'users.users.signup': { paramsTuple?: []; params?: {} }
    'products.products.create': { paramsTuple?: []; params?: {} }
  }
  PATCH: {
    'users.users.update_one': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.products.update_one': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
  DELETE: {
    'users.users.delete_one': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
    'products.products.delete_one': { paramsTuple: [ParamValue]; params: {'id': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}