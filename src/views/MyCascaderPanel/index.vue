<template>
  <div class="cascader-box">
    <div class="cascader-panel-wrapper">
      <div v-for="(item, index) in cascaderOptions" :key="index" class="cascader-panel">
        <!-- <div class="cascader-panel-title">title</div> -->
        <List :itemHeight="32" :options="item" class="cascader-list">
          <!-- <template #listTop>标题</template> -->
          <template #list="{ data }">
            <div
              v-for="itm in data"
              class="item-label-wrapper"
              :class="{ 'is-active': itm.checked }"
              :key="itm.value"
              @click="handleNodeClick(itm)"
            >
              <div class="item-label-content">
                <div class="item-label-left">
                  <div v-if="itm.level !== 0" class="check-prefix">
                    <span v-if="itm.checked">√</span>
                  </div>
                  <span class="item-label">{{ itm.label }}</span>
                </div>
                <span class="arrow">{{ itm?.children?.length ? '>' : '' }}</span>
              </div>
            </div>
          </template>
        </List>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, watch } from 'vue'
import List from './components/List.vue'
import type { Options, OptionsNode } from './types/index'

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
function extractCheckedValues(treeNodes: OptionsNode[], result: any[] = []): any[] {
  const resultNodes: OptionsNode[] = treeNodes.flatMap((item) => item.children || [])
  for (const node of resultNodes) {
    if (node.checked) {
      result.push(node.value)
    }
    if (node.children) {
      extractCheckedValues(node.children, result)
    }
  }

  return result
}

function optiionToNode(data: Options[], modelValue: string[] = [], level = 0): OptionsNode[] {
  // console.log(data, modelValue, '=====')
  return data?.map((item) => {
    modelValue?.forEach((item) => {})
    return {
      value: item.value,
      label: item.label,
      checked: modelValue.includes(item.value) ? true : false,
      isActive: false,
      level: level,
      children: item.children ? optiionToNode(item.children, modelValue, level + 1) : []
    }
  })
}
function removeEmpty(arr: OptionsNode[][]) {
  return arr.filter((item) => item.length)
}
function handleNodeClick(node: OptionsNode) {
  if (node.level === 0) {
    if (node?.children?.length) {
      cascaderOptions.value[node.level + 1] = node.children
    } else {
      cascaderOptions.value[node.level + 1] = []
      cascaderOptions.value = removeEmpty(cascaderOptions.value)
    }
  } else {
    // console.log(node.checked)
    node.checked = !node.checked
    const result = extractCheckedValues(cascaderOptions.value[0])
    console.log(result)
    emit('update:modelValue', result)
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
  console.log(node)
  // const result = getCheckedLeafNodePairs(cascaderOptions.value)
  // emit('update:modelValue', result)
}
</script>
<script lang="ts">
export default defineComponent({
  name: 'MyCascaderPanel'
})
</script>
<style scoped lang="scss">
.cascader-box {
  border: 1px solid #ddd;
  width: fit-content;
  .cascader-panel-wrapper {
    display: flex;
    .cascader-panel {
      height: 200px;
      width: 180px;
      margin: 4px;
      display: block;
      // .cascader-panel-title {
      //   border-bottom: 1px solid #ddd;
      //   height: 32px;
      // }
      .cascader-list {
        .item-label-wrapper {
          line-height: 32px;
          font-size: 14px;
          cursor: pointer;
          .item-label-content {
            display: flex;
            justify-content: space-between;
            .item-label-left {
              display: flex;
              .check-prefix {
                padding: 0 4px;
                width: 12px;
              }
              .item-label {
                padding: 0 4px;
              }
            }
            .arrow {
              padding: 0 4px;
            }
          }
        }
        .is-active {
          color: aqua;
        }
        .item-label-wrapper:hover {
          background-color: #eee;
        }
      }
    }
  }
}
</style>
