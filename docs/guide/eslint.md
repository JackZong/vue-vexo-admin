# 项目规范

本项目中使用了eslint去检查代码规范，使用prettier去格式化代码。

## 编辑器自动校验

使用vscode进行开发，可以搭配vscode的一些插件，实现自动修改一些错误，同时项目中也自带了vscode的一些配置，在 `.vscode/setting.json` 文件中。 注意：要自动修复错误需要使用vscode打开admin文件夹才行

如果使用vscode格式化后还是出现很多eslint错误，有可能是格式化程序设置有误，只需要设置默认的格式化程序为Prettier ESLint即可

## 手动校验代码

执行命令：

```shell
pnpm lint
```
