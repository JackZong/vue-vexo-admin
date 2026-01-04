import enLocale from 'element-plus/es/locale/lang/en'
import ruLocale from 'element-plus/es/locale/lang/ru'
import zhCnLocale from 'element-plus/es/locale/lang/zh-cn'
import Cookies from 'js-cookie'
import { createI18n } from 'vue-i18n'

import config from '@/config'
import en from '@/locales/en_US.json'
import ru from '@/locales/ru_RU.json'
import zh from '@/locales/zh_CN.json'
import { getLocale, setLocale } from '@/utils/local'

import { AuthMethodEnum } from './enums/appEnums'

const i18n = createI18n({
  locale: getLocale() || 'zh_CN',
  fallbackLocale: 'en_US',
  legacy: false, // you must set `false`, to use Composition API
  messageResolver: undefined,
  messages: {
    en_US: {
      ...enLocale,
      ...en
    },
    zh_CN: {
      ...zhCnLocale,
      ...zh
    },
    ru_RU: {
      ...ruLocale,
      ...ru
    }
  }
})

export const t = i18n.global.t

// 切换语言
export function setI18nLanguage(locale: any) {
  i18n.global.locale.value = locale
  setLocale(locale)
  /**
   * NOTE:
   * If you need to specify the language setting for headers, such as the `fetch` API, set it here.
   * The following is an example for axios.
   *
   * axios.defaults.headers.common['Accept-Language'] = locale
   */

  document.querySelector('html')?.setAttribute('lang', locale)
  if (config.authMethod === AuthMethodEnum.SESSION_COOKIE) {
    Cookies.set('locale', locale)
  }
}

export default i18n
