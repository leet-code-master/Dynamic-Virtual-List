<template>
  <div>MyDefault</div>
  <div>{{ data }}</div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'

defineProps({
  data: {
    type: Object
  }
})
</script>

<script lang="ts">
export default defineComponent({
  name: 'MyDefault'
})
</script>
<style scoped lang="scss"></style>
