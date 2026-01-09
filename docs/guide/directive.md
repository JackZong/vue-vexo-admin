# 新增自定义指令

下面以v-perms为例子： 在`src/install/directives`下面新建一个文件`perms.ts`，指令名即为文件名

```ts
// perms.ts
/**
 * perm 操作权限处理
 * 指令用法：
 *  <el-button v-perms="['auth.menu/edit']">编辑</el-button>
 */

import useUserStore from '@/stores/modules/user'

export default {
    mounted: (el: HTMLElement, binding: any) => {
        const { value } = binding
        const userStore = useUserStore()
        const permissions = userStore.perms
        const all_permission = '*'
        if (Array.isArray(value)) {
            if (value.length > 0) {
                const hasPermission = permissions.some((key: string) => {
                    return all_permission == key || value.includes(key)
                })

                if (!hasPermission) {
                    el.parentNode && el.parentNode.removeChild(el)
                }
            }
        } else {
            throw new Error('like v-perms="[\'auth.menu/edit\']"')
        }
    }
}
```

这样就完成一个自定义指令，不需要将文件引入到`main.ts`