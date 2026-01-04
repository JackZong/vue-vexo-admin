

import { LOCALE_KEY } from '@/enums/cacheEnums'

import cache from './cache'

export function getLocale() {
  return cache.get(LOCALE_KEY)
}

// 设置语言
export function setLocale(value: string) {
  cache.set(LOCALE_KEY, value)
}

export function removeLocale() {
  cache.remove(LOCALE_KEY)
}
