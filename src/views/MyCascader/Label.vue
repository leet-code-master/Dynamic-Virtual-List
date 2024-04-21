<template>
  <div class="label">{{ displayLabel }}</div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  label: string[]
}

const props = defineProps<Props>()

const displayLabel = computed(() => {
  return props.label.join('，')
})
</script>
<style scoped lang="scss">
.label {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: inherit;
}
</style>
