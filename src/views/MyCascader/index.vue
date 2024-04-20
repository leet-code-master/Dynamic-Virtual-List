<template>
  <!-- <div>
    <h1>{{ checked }}</h1>
    <Cascader v-model="checked" :options="options" />
  </div> -->
  <div>
    <h1>{{ checked }}</h1>
    <MyCascaderPanel v-model="checked" :options="options" />
  </div>
</template>

<script setup lang="ts">
import { defineComponent, onMounted, ref } from 'vue'
// import Cascader from '../Cascader/index.vue'
import MyCascaderPanel from '../MyCascaderPanel/index.vue'
import type { Options } from '@/types'
import { mockOptions } from '@/const/index'

const checked = ref(['2-1'])
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
<style scoped lang="scss"></style>
