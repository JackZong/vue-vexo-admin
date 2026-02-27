
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
