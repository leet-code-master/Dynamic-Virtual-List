<template>
  <div class="example-container">
    <div class="container">
      <DynamicVirtualList :data="message_data" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import DynamicVirtualList from '../DynamicVirtualList/index.vue'

import { SESSION_DATA } from '@/const/index.ts'
import type { SESSION_DATA_TYPE } from '@/const/index.ts'

const message_data = ref<SESSION_DATA_TYPE[]>([])

message_data.value = SESSION_DATA
</script>
<script lang="ts">
export default defineComponent({
  name: 'MyExample'
})
</script>
<style scoped lang="scss">
.example-container {
  display: flex;
  justify-content: center;
  margin-top: 80px;
  .container {
    height: 350px;
    width: 800px;
  }
}
</style>
