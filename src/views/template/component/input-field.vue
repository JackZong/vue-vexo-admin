<template>
  <div>
    <el-card header="Input Field" shadow="never" class="border-none!">
      <div class="flex gap-5">
        <div>
          <pax-input-field
            v-model="year"
            style="width: 120px"
            placeholder="Please input"
            sup-label="年份年"
            @input="handleInput"
          />
        </div>
        <div>
          <pax-input-field
            v-model="year"
            style="width: 120px"
            placeholder="Please input"
            sup-label="年份超长年份年份年份年份年份年份年份"
            @input="handleInput"
          />
        </div>
        <div>
          <pax-input-field
            v-model="year"
            style="width: 120px"
            disabled
            placeholder="年份禁用"
            @input="handleInput"
          />
        </div>
        <div>
          <pax-input-field
            v-model="value"
            style="width: 120px"
            placeholder="Please input"
            sup-label="输入任意字符"
            @input="handleInput"
          >
            <template #suffix>
              <i class="flt-icon icon-ic_line_search" />
            </template>
          </pax-input-field>
        </div>

        <div>
          <pax-input-field :model-value="year" style="width: 120px" placeholder="年份禁用" />
        </div>

        <div>
          <pax-input-field v-model="year" type="password" placeholder="密码" show-password />
        </div>

        <div>
          <pax-input-field
            v-model="year"
            style="width: 200px"
            placeholder="Please input"
            sup-label="年份超长，tooltip年份年份年份年份年份年份年份"
            if-field-tooltip
            @input="handleInput"
          />
        </div>
      </div>

      <div class="mt-10">
        <pax-input-field
          v-model="value"
          type="textarea"
          placeholder="Please input"
          sup-label="内容"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const year = ref(new Date().getFullYear())
function handleInput() {
  year.value = year.value.replace(/[^\d]/g, '')
}
const value = ref('')
</script>
