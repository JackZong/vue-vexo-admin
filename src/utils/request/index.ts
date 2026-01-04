

import { AxiosError, type AxiosRequestConfig } from 'axios'
import { merge } from 'lodash'
import NProgress from 'nprogress'

import configs from '@/config'
import { AuthMethodEnum } from '@/enums/appEnums'
import { ContentTypeEnum, RequestCodeEnum, RequestMethodsEnum } from '@/enums/requestEnums'
import { t } from '@/i18n'

import { getToken } from '../auth'
import feedback from '../feedback'
import { Axios } from './axios'
import type { AxiosHooks } from './type'

let showErrorTip = true
let showSuccessTip = false

// 处理axios的钩子函数
const axiosHooks: AxiosHooks = {
  requestInterceptorsHook(config) {
    NProgress.start()
    const { withToken, isParamsToData, errorTip, successTip } = config.requestOptions
    const params = config.params || {}
    const headers = config.headers || {}
    showErrorTip = errorTip
    showSuccessTip = successTip

    if (configs.authMethod === AuthMethodEnum.JWT) {
      // 添加token
      if (withToken) {
        const token = getToken()
        // headers.token = token
        headers['Authorization'] = `Bearer ${token}`
      }

      // 添加语言
      // headers['Accept-Language'] = getLocale() || 'zh_CN'
    }

    // POST请求下如果无data，则将params视为data
    if (
      isParamsToData &&
      !Reflect.has(config, 'data') &&
      config.method?.toUpperCase() === RequestMethodsEnum.POST
    ) {
      config.data = params
      config.params = {}
    }
    config.headers = headers
    // config.url = config.url?.replace(".", "/")
    return config
  },
  requestInterceptorsCatchHook(err) {
    NProgress.done()
    return err
  },
  async responseInterceptorsHook(response) {
    NProgress.done()
    const { isTransformResponse, isReturnDefaultResponse } = response.config.requestOptions

    //返回默认响应，当需要获取响应头及其他数据时可使用
    if (isReturnDefaultResponse) {
      return response
    }
    // 是否需要对数据进行处理
    if (!isTransformResponse) {
      return response.data
    }

    const { code, result, message } = response.data
    switch (code) {
      case RequestCodeEnum.SUCCESS:
        if (showSuccessTip) {
          message && feedback.msgSuccess(t(message))
        }
        return result
      case RequestCodeEnum.INTERNAL_SERVER_ERROR:
      case RequestCodeEnum.INVALID_REQUEST_METHOD:
      case RequestCodeEnum.SESSION_TIMEOUT:
      case RequestCodeEnum.NOT_AUTHORIZED:
      case RequestCodeEnum.BUSINESS_EXCEPTION:
      case RequestCodeEnum.ILLEGAL_PARAMETER:
        if (showErrorTip) {
          message && feedback.msgError(t(message))
        }
        return Promise.reject(result)
      // case RequestCodeEnum.LOGIN_FAILURE:
      //     clearAuthInfo()
      //     router.push(PageEnum.LOGIN)
      //     return Promise.reject()
      // case RequestCodeEnum.OPEN_NEW_PAGE:
      //     window.location.href = result.url
      //     return result
      default:
        if (showErrorTip) {
          message && feedback.msgError(message)
        }
        return result
    }
  },
  responseInterceptorsCatchHook(error) {
    NProgress.done()
    if (error.code !== AxiosError.ERR_CANCELED) {
      error.message && feedback.msgError(error.message)
    }
    return Promise.reject(error)
  }
}

const defaultOptions: AxiosRequestConfig = {
  //接口超时时间
  timeout: configs.timeout,
  // 基础接口地址
  baseURL: configs.proxy ? '/api' : configs.baseUrl,
  //请求头
  headers: { 'Content-Type': ContentTypeEnum.JSON, version: configs.version },
  // 处理 axios的钩子函数
  axiosHooks: axiosHooks,
  // 是否携带cookie
  withCredentials: configs.authMethod === AuthMethodEnum.SESSION_COOKIE,
  // 每个接口可以单独配置
  requestOptions: {
    // 是否将params视为data参数，仅限post请求
    isParamsToData: true,
    //是否返回默认的响应
    isReturnDefaultResponse: false,
    // 需要对返回数据进行处理
    isTransformResponse: true,
    // 接口拼接地址
    urlPrefix: configs.urlPrefix,
    // 忽略重复请求
    ignoreCancelToken: false,
    // 是否携带token
    withToken: true,
    // 是否显示提示错误信息
    errorTip: true,
    // 是否显示提示成功信息
    successTip: false,
    // 开启请求超时重新发起请求请求机制
    isOpenRetry: true,
    // 重新请求次数
    retryCount: 2
  }
}

function createAxios(opt?: Partial<AxiosRequestConfig>) {
  return new Axios(
    // 深度合并
    merge(defaultOptions, opt || {})
  )
}
const request = createAxios()
export default request
