# 代码生成

系统使用[plop](https://github.com/plopjs/plop)生成模板代码。

在 `plop-templates` 目录中配置模板。`plopfile.cjs` 为 `plop` 配置文件。

使用：

1. `pnpm plop`
2. 输入模板名称
3. 输入参数
4. 生成代码

```shell
~/Workspace/Git/pax-admin-pro (fleet ✗) pnpm plop

> pax-admin-pro@1.0.0 plop /Users/iosdev/Workspace/Git/pax-admin-pro
> plop

? 请输入模块名（例如：user） terminal
? 请输入功能名（例如：用户管理） 终端
✔  ++ /src/views/terminal/index.vue
✔  ++ /src/views/terminal/edit.vue
✔  ++ /src/api/terminal.ts
```
