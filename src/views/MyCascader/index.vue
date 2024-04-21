<template>
  <!-- <div>
    <h1>{{ checked }}</h1>
    <Cascader v-model="checked" :options="options" />
  </div> -->
  <div>
    <h1>选中的{{ checked }}</h1>
    <el-dropdown trigger="click">
      <div class="cascader-input">
        <Label :label="checked" />
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <div class="search-input">
            <el-input v-model="inputValue" placeholder="输入以搜索" clearable />
          </div>
          <MyCascaderPanel v-model="checked" :options="options" />
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
import MyCascaderPanel from '../MyCascaderPanel/index.vue'
import type { Options } from '@/types'
import { mockOptions } from '@/const/index'
import Label from './Label.vue'

const checked = ref(['2-1'])
const inputValue = ref('')
const options = ref<Options[]>([])
onMounted(() => {
  options.value = mockOptions
})
</script>
<script lang="ts">
export default defineComponent({
  name: 'MyCascader'
})
</script>
<style scoped lang="scss">
.cascader-input {
  border: 1px solid #ddd;
  width: 120px;
  height: 32px;
  line-height: 32px;
  border-radius: 4px;
  padding: 0 4px;
  box-sizing: border-box;
  overflow: hidden;
}
.cascader-input:focus-within {
  border-color: #409eff;
}
.search-input {
  padding: 12px;
}
</style>
