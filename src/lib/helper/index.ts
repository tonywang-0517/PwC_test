import { _storage } from "@lib/helper/_storage";


export function storageGet(key?:any|undefined) {
  return _storage(null, key, 'get')
}

export function storageSet(key:any, items:any) {
  return _storage(items, key, 'set')
}

export function storageReset(key:any, items:any) {
  return _storage(items, key, 'reset')
}
