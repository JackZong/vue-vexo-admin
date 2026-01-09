# 使用vue插件

下面以`vue-router`为例子： 在`src/install/plugins`下面新建一个文件`router.ts`

```ts
// router.ts 
import router from '@/router'
import type { App } from 'vue'

export default (app: App<Element>) => {
    app.use(router)
}
```

这样就完成了插件的注册，不需要将文件引入到`main.ts`