# 配置项

修改默认的配置

## 环境变量

变量命名规则：需要以VITE_为前缀的
如何使用：import.meta.env.VITE_
更多细节见https://vitejs.cn/guide/env-and-mode.html#env-variables

- `.env.development`
开发环境适用

```Typescript
NODE_ENV = 'development'

# 请求域名
VITE_APP_BASE_URL='https://xxx.example.com/api'
```

- `.env.production`
生产环境适用

```Typescript
NODE_ENV = 'production'

# 请求域名
VITE_APP_BASE_URL=''  //填空则跟着网站的域名来请求
```

## 系统配置项
路径：`src/config/index.ts`，说明如下：

```Typescript
const config = {
    terminal: 1, //终端
    title: '后台管理系统', //网站默认标题
    version: '1.2.1', //版本号
    baseUrl: `${import.meta.env.VITE_APP_BASE_URL}/`, //请求接口域名
    urlPrefix: 'adminapi', //请求默认前缀
    timeout: 10 * 1000 //请求超时时长
}
```

## 主题配置项

修改系统默认的主题 路径：`src/config/setting.ts`，说明如下：

```Typescript
const defaultSetting = {
    sideWidth: 200, //侧边栏宽度
    sideTheme: 'light', //侧边栏主题
    sideDarkColor: '#1d2124', //侧边栏深色主题颜色
    theme: '#4A5DFF', //主题色
    successTheme: '#67c23a', //成功主题色
    warningTheme: '#e6a23c', //警告主题色
    dangerTheme: '#f56c6c', //危险主题色
    errorTheme: '#f56c6c', //错误主题色
    infoTheme: '#909399' //信息主题色
}
//以上各种主题色分别对应element-plus的几种行为主题
```
