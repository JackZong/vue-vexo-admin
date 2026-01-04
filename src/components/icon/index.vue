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
<script lang="ts">
import { ElIcon } from 'element-plus'
import { createVNode, defineComponent, h, resolveComponent } from 'vue'

import { EL_ICON_PREFIX, LOCAL_ICON_PREFIX } from './index'
import svgIcon from './svg-icon.vue'

export default defineComponent({
  name: 'Icon',
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: [String, Number],
      default: '14px'
    },
    color: {
      type: String,
      default: 'inherit'
    }
  },
  setup(props) {
    return () => {
      if (props.name.indexOf(EL_ICON_PREFIX) === 0) {
        // el-icon
        return createVNode(
          ElIcon,
          {
            size: props.size,
            color: props.color
          },
          {
            default: () => createVNode(resolveComponent(props.name.replace(EL_ICON_PREFIX, '')))
          }
        )
      }
      if (props.name.indexOf(LOCAL_ICON_PREFIX) === 0) {
        // 本地icon
        return h(
          'i',
          {
            class: ['local-icon']
          },
          createVNode(svgIcon, { ...props })
        )
      }
      // 如果name不符合预期的前缀，返回null
      return null
    }
  }
})
</script>
