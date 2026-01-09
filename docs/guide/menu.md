# 菜单

在`@/config/menu/`目录中可以添加菜单文件。

菜单文件格式如下：

```ts
interface MenuConfig {
  /** 菜单名称 */
  title: string
  /** 菜单图标 */
  icon?: string
  /** 是否缓存 */
  keepAlive?: boolean
  /** 是否隐藏 */
  hidden?: boolean
  /** 组件路径 */
  component?: string
  /** 实际跳转的地址 */
  path?: string
  /** 权限 */
  perms?: string
  /** 选中菜单的子菜单 */
  selected?: string
  /** 菜单参数 */
  params?: string
  /** 子菜单 */
  children?: MenuConfig[]
}
```

当有多个角色时，为了避免菜单配置过于混乱，可以分角色创建菜单文件。

```ts
├──📂 menu
│  ├── adminMenu.ts       # 平台管理员菜单
│  ├── merchantMenu.ts    # 商户菜单
```
