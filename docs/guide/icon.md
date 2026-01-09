# 图标

项目中对图标的使用进行了封装，位于`src/components/icon`文件夹内
目前有两种图标：1.element-plus带有的图标库。2.本地svg图标库

## element-plus图标库
使用：

```ts
// 官方
import { Edit } from '@element-plus/icons-vue'
<el-icon :size="20">
    <Edit />
</el-icon>

//推荐
<icon :size="20" name="el-icon-Edit" />
```

## 本地图标库

本地图标库位于`src/assets/icons`内，如果需要添加svg图标，只需要将svg文件放到`src/assets/icons`中即可

如：copy.svg

使用：

```ts
<icon :size="20" name="local-icon-copy" />
```
