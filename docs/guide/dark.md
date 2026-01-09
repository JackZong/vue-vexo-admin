# 黑暗主题

黑暗模式的原理是利用css变量和在html标签添加class="dark"实现，如果需要改黑暗模式的css变量可修改文件src/styles/dark.css

组件中的字体颜色，背景颜色等颜色样式需要使用这些变量才能适配黑暗模式和正常模式

使用：

```vue
//使用tailwindcss
<template>
    <div class="bg-body text-tx-regular">
        默认背景，次要字体样式
    </div>
</template>

//使用css变量
<template>
    <div class="example">
        默认背景，次要字体样式
    </div>
</template>
<style scoped>
.example {
    background-color: var(--el-bg-color-page);
    color: var(--el-text-color-regular);
}
</style>
```
