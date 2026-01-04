

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
