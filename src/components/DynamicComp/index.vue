<template>
  <div>
    <component :is="CompMap[data.type]" :data="data.content" />
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import Text from '../Text/index.vue'
import Button from '../Button/index.vue'
import Default from '../Default/index.vue'

const props = defineProps({
  data: {
    type: Object
  }
})
console.log('Dynamic Comp DATA', props.data)

const CompMap = {
  text: Text,
  button: Button,
  default: Default
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'DynamicComp'
})
</script>

<style scoped lang="scss"></style>
