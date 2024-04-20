<template>
  <div class="scroller-container" ref="scrollerContainerRef" @scroll="onScroll">
    <div class="scroll-bar-dom" :style="{ height: `${scrollBarHeight}px` }" />
    <div class="content-list" :style="styleTranslate">
      <slot name="listTop"></slot>
      <slot name="list" :data="renderData"></slot>
      <!-- <div class="item" v-for="item in renderData" :key="item.value" @click="handleClickItem(item)">
        <slot name="listItem" :data="item"></slot>
        <el-checkbox v-model="item.checked" @change="handleCheckedChange(item)">{{
          item.label
        }}</el-checkbox>
      </div> -->
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, defineComponent, ref, toRefs } from 'vue'
import type { OptionsNode } from '@/types'
const props = withDefaults(
  defineProps<{
    itemHeight?: number
    options: OptionsNode[]
  }>(),
  {
    itemHeight: () => 32,
    options: () => []
  }
)
const emit = defineEmits(['node-click', 'node-check'])

const { itemHeight } = toRefs(props)
const scrollBarHeight = computed<number>(() => {
  return itemHeight.value * allData.value.length
})
const allData = computed(() => props.options)
/**
 * 内容容器的y轴偏移量。当渲染区域第一个元素完全移到了可视区域之外时，需要重新计算startOffset，将第一个元素移动回可视区域
 */
const startOffset = ref<number>(0)
const styleTranslate = computed<string>(() => {
  return `transform:translate(0,${startOffset.value}px)`
})
/**
 * 当前视口第一个数据在allData数组的索引位置. 默认:0
 */
const start = ref<number>(0)
/**
 * 当前视口最后一个数据在allData数组的索引位置
 */
const end = computed(() => {
  return start.value + pageItemCount.value
})
/**
 * 当前视口需要显示的数据
 */
const renderData = computed<OptionsNode[]>(() => {
  // 前面多缓冲一屏（避免滚动到顶部时，数组下标小于0）
  let realStart = Math.max(0, start.value - pageItemCount.value)

  // 后面也多换从一屏(避免最后一个元素的数组下标超出实际的数组长度)
  const realEnd = Math.min(end.value + pageItemCount.value, allData.value.length)
  return allData.value.slice(realStart, realEnd)
})
/**
 * 滚动容器. 支持显示滚动条的容器。确定虚拟列表的可视区高度
 */
const scrollerContainerRef = ref<HTMLDivElement>()
/**
 * 滚动容器高度。采用计算属性方式动态获取滚动容器高度
 */
const scrollerContainerRefHeight = computed(() => {
  return scrollerContainerRef.value ? scrollerContainerRef.value.offsetHeight : 0
})
/**
 * 视口可显示的元素数量： 滚动容器高度/每一项的高度，然后对结果进行向上取整，然后再+1
 *
 * 为什么要进行向上取整？
 * 如：页面高度100px，单个元素30px，那么此时100/30等于3，还多了10px，那这10px实际应该显示第4个元素的一小部分，所以需要进行向上取整
 *
 * 为什么最后还要+1？
 * 如：页面高度100px，单个元素30px，根据向上取整的方式，我们已经将这个视口渲染出了4个元素，第4个元素只有10px在视口中，剩余20px在视口之外。
 * 如果此时我们拖动滚动条，拖动25px，此时第一个元素尚未完全移出视口，最后一个元素完全进入了视口，且还有5px空白。按照通常的想法，这里应该显示第5个元素的一小部分才对。
 * 因此，最后还需要+1
 */
const pageItemCount = computed<number>(() => {
  return Math.ceil(scrollerContainerRefHeight.value / itemHeight.value) + 1
})
// function handleClickItem(item: OptionsNode) {
//   emit('node-click', item)
// }
// function handleCheckedChange(item: OptionsNode) {
//   emit('node-check', item)
// }

function onScroll(evt: UIEvent) {
  // 获取触发滚动事件的元素
  const scrollDom = evt.target as HTMLDivElement
  if (!scrollDom) return

  // 获取滚动的距离
  const { scrollTop } = scrollDom
  // 根据滚动的距离，计算此时视口顶部需要显示的第一个元素
  start.value = Math.floor(scrollTop / itemHeight.value)

  // 计算有了缓冲之后的start位置，根据有了缓冲之后的start位置来计算startOffset
  let realStart = Math.max(0, start.value - pageItemCount.value)
  startOffset.value = realStart * itemHeight.value
}
</script>
<script lang="ts">
export default defineComponent({
  name: 'VirtualList'
})
</script>
<style lang="scss" scoped>
.scroller-container {
  height: 100%;
  width: 100%;
  overflow: auto;
  position: relative;
  -webkit-overflow-scrolling: touch;
  .scroll-bar-dom {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    z-index: -1;
  }
  .content-list {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    // .item {
    //   height: calc(v-bind(itemHeight) * 1px);
    //   line-height: calc(v-bind(itemHeight) * 1px);
    //   border-bottom: 1px solid #ddd;
    //   width: 100%;
    //   box-sizing: border-box;
    //   padding: 0 12px;
    //   cursor: pointer;
    //   &:last-child {
    //     border-bottom: none;
    //   }
    // }
  }
}
</style>
