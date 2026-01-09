# 接口请求

系统中使用`axios`这个库来发起请求，并对其进行了更深一步的封装
位于`src/utils/request`

```ts
├──📂 request
│  ├── axios.ts    # 封装的axios实例
│  ├── cancel.ts   # 封装的取消重复请求实例
│  ├── index.ts    # 接口返回统一处理及默认配置
│  ├── type.d.ts   # 类型声明文件
```

一般只需要修改`index.ts`文件，其他文件无需修改

`index.ts`文件说明:

## 默认配置

```ts
const defaultOptions: AxiosRequestConfig = {
    //接口超时时间
    timeout: configs.timeout,
    // 基础接口地址
    baseURL: configs.baseUrl,
    //请求头
    headers: { 'Content-Type': ContentTypeEnum.JSON, version: configs.version },
    // 处理 axios的钩子函数
    axiosHooks: axiosHooks,
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
        // 开启请求超时重新发起请求请求机制
        isOpenRetry: true,
        // 重新请求次数
        retryCount: 2
    }
}
```

## 请求拦截器配置

```ts
const axiosHooks: AxiosHooks = {
    requestInterceptorsHook(config) {
        NProgress.start()
        const { withToken, isParamsToData } = config.requestOptions
        const params = config.params || {}
        const headers = config.headers || {}

        // 添加token
        if (withToken) {
            const token = getToken()
            headers.token = token
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
        const { code, data, show, msg } = response.data
        switch (code) {
            case RequestCodeEnum.SUCCESS: //成功
                if (show) {
                    msg && feedback.msgSuccess(msg)
                }
                return data
            case RequestCodeEnum.FAIL: //失败
                if (show) {
                    msg && feedback.msgError(msg)
                }
                return Promise.reject(data)
            case RequestCodeEnum.LOGIN_FAILURE: //token过期
                clearAuthInfo()
                router.push(PageEnum.LOGIN)
                return Promise.reject()
            case RequestCodeEnum.OPEN_NEW_PAGE: //重定向打开页面
                window.location.href = data.url
                return data
            default:
                return data
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
```

## 如何在单个接口中单独使用这些配置

```ts
// 配置
export function xxxx(data) {
    return request.post({ 
        url: 'xxx',
        header: {
            'Content-type': ContentTypeEnum.FORM_DATA
        },
        data
    }, {
        // 忽略重复请求
        ignoreCancelToken: true,
        // 开启请求超时重新发起请求请求机制
        isOpenRetry: false,
         // 需要对返回数据进行处理
        isTransformResponse: false,
    })
}
```
