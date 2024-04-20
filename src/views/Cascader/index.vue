<template>
  <div class="cascader-box">
    <div v-for="(item, index) in cascaderOptions" :key="index" class="cascader-item">
      <VirtualList
        :itemHeight="32"
        :options="item"
        @node-click="handleNodeClick"
        @node-check="handleNodeCheck"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import VirtualList from '@/components/VirtualList/index.vue'
import type { Options, OptionsNode } from '@/types'

interface Props {
  modelValue: string[]
  options: Options[]
}
const props = defineProps<Props>()
const emit = defineEmits(['update:modelValue'])

const cascaderOptions = ref<OptionsNode[][]>([])

watch(
  () => props.options,
  (newVal) => {
    cascaderOptions.value = [optiionToNode(newVal, props.modelValue)]
    console.log('resultOptions', cascaderOptions.value)
  },
  { deep: true }
)
function getCheckedLeafNodePairs(tree: OptionsNode[][]) {
  const result: string[][] = []

  function traverse(node: OptionsNode, path: string[] = []) {
    if (node.children) {
      node.children.forEach((child) => {
        traverse(child, [...path, node.value])
      })
    } else if (node.checked) {
      result.push([...path, node.value])
    }
  }

  tree.forEach((node) => {
    traverse(node)
  })
  return result
}
// function getCheckedLeafNodePairs(tree: OptionsNode[][]) {
//   const result: string[][] = []

//   function traverse(node: OptionsNode, path: string[] = []) {
//     if (node.children) {
//       node.children.forEach((child) => {
//         traverse(child, [...path, node.value])
//       })
//     } else if (node.checked) {
//       result.push([...path, node.value])
//     }
//   }

//   tree.forEach((node) => {
//     traverse(node)
//   })
//   return result
// }
function optiionToNode(data: Options[], modelValue: string[] = [], level = 0): OptionsNode[] {
  console.log(data, modelValue, '=====')
  return data?.map((item) => {
    modelValue?.forEach((item) => {})
    return {
      value: item.value,
      label: item.label,
      checked: modelValue.includes(item.value) ? true : false,
      level: level,
      children: item.children ? optiionToNode(item.children, modelValue, level + 1) : []
    }
  })
}
function removeEmpty(arr: OptionsNode[][]) {
  return arr.filter((item) => item.length)
}
function handleNodeClick(node: OptionsNode) {
  if (node?.children?.length) {
    cascaderOptions.value[node.level + 1] = node.children
  } else {
    cascaderOptions.value[node.level + 1] = []
    cascaderOptions.value = removeEmpty(cascaderOptions.value)
  }
}
function mapTree(node: OptionsNode[], checked: boolean) {
  node.forEach((item: OptionsNode) => {
    item.checked = checked
    if (item?.children?.length) {
      mapTree(item.children, checked)
    }
  })
}
function handleNodeCheck(node: OptionsNode) {
  if (node?.children?.length) {
    mapTree(node?.children, node.checked)
  }
  // const result = getCheckedLeafNodePairs(cascaderOptions.value)
  // emit('update:modelValue', result)
}
</script>
<script lang="ts">
export default defineComponent({
  name: 'MyCascader'
})
</script>
<style scoped lang="scss">
.cascader-box {
  display: flex;
  .cascader-item {
    min-height: 200px;
    min-width: 200px;
    border: 1px solid #ddd;
    margin: 4px;
  }
}
</style>
