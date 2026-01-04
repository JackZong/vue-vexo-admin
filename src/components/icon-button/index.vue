
<!-- /*
  * ===========================================================================================
  * = COPYRIGHT
  *          PAX Computer Technology (Shenzhen) Co., Ltd. PROPRIETARY INFORMATION
  *   This software is supplied under the terms of a license agreement or nondisclosure
  *   agreement with PAX Computer Technology (Shenzhen) Co., Ltd. and may not be copied or
  *   disclosed except in accordance with the terms in that agreement.
  *     Copyright (C) 2022-2023 PAX Computer Technology (Shenzhen) Co., Ltd. All rights reserved.
  * Description: // Detail description about the function of this module,
  *             // interfaces with the other modules, and dependencies.
  * Revision History:
  * Date                  Author                 Action
  * 2025/12/11            PAX                    Create
  * ===========================================================================================
*/
 -->
 <template>
  <div>
    <el-tooltip effect="dark" placement="top" :content="content">
      <icon :color="color" :size="size" :name="name" />
    </el-tooltip>
  </div>
</template>

<script lang="ts">
export default defineComponent({
  props: {
    content: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    size: {
      type: [String, Number],
      default: 20
    },
    color: {
      type: String,
      default: 'var(--el-color-primary)'
    }
  }
})
</script>
