# 使用本地存储

项目中对本地存储进行了封装，位于`src/utils/cache.ts`，推荐使用时搭配`cacheEnums.ts`一起使用

设置缓存：

```ts
// src/enums/cacheEnums.ts
export const TOKEN_KEY = 'token'  

// xxx/xxx.ts
import { TOKEN_KEY } from '@/enums/cacheEnums'
cache.set(TOKEN_KEY, 'xxxx') 
//带有时间的缓存
cache.set(TOKEN_KEY, 'xxxx', 10 * 12 *  3600) // 10 * 12 *  3600为缓存时间，单位为s
```

获取缓存：

```ts
import { TOKEN_KEY } from '@/enums/cacheEnums'
cache.get(TOKEN_KEY)
```

删除缓存：

```ts
import { TOKEN_KEY } from '@/enums/cacheEnums'
cache.remove(TOKEN_KEY)
```

清空缓存：

```ts
cache.clear()
```
