<template>
  <div>
    <el-card header="Demo" shadow="never" class="border-none!">
      <app-link to="/zh-CN/component/form-crud">跳转CRUD</app-link>
      <hr class="my-2" />
      <app-link to="https://element-plus.org/zh-CN/" link-type="300"
        >跳转Element-Plus官网- 新窗口</app-link
      >
      <hr class="my-2" />
      <app-link to="https://element-plus.org/zh-CN/" link-type="300" target="_self"
        >跳转Element-Plus官网 - 当前窗口
      </app-link>
    </el-card>

    <el-card header="带下划线的链接" shadow="never" class="border-none! mt-4">
      <app-link underline to="/zh-CN/component/form-crud">跳转CRUD</app-link>
      <div class="my-2" />
      <app-link underline to="https://element-plus.org/zh-CN/" link-type="300"
        >跳转Element-Plus官网- 新窗口</app-link
      >
      <div class="my-2" />
      <app-link to="https://element-plus.org/zh-CN/" link-type="300" underline target="_self"
        >跳转Element-Plus官网 - 当前窗口</app-link
      >
    </el-card>
  </div>
</template>
