<template>
  <div class="flex-container">
    <div class="scroll-panel">
      <div class="scroll-left">
        <div class="dimension-title">
          <div>热门维度</div>
        </div>
        <div class="dimension-wrapper" ref="dimensionWrapperRef">
          <div v-for="item in dimensionList" :key="item">
            <button>{{ item }}</button>
          </div>
        </div>
      </div>
      <div class="scroll-btn" v-show="isShowScroll">
        <button @click="scrollLeft">《</button>
        <span>-</span>
        <button @click="scrollRight">》</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineComponent, ref, type Ref, onMounted, onBeforeUnmount } from 'vue'
const dimensionList = ref(['111111', '2222', '3333', '4444', '5555', '7777', '8888'])
const dimensionWrapperRef = ref<Ref>()
const dimensionWidth = ref<number>()
const isShowScroll = ref<boolean>(false)

const getDimenSionWidth = () => {
  console.log('chufale ')
  dimensionWidth.value = dimensionWrapperRef.value?.clientWidth as number
  if (dimensionWrapperRef.value?.scrollWidth > dimensionWrapperRef.value?.offsetWidth) {
    isShowScroll.value = true
  } else {
    isShowScroll.value = false
  }
}
onMounted(() => {
  if (dimensionWrapperRef.value?.scrollWidth > dimensionWrapperRef.value?.offsetWidth) {
    isShowScroll.value = true
  }
  dimensionWidth.value = dimensionWrapperRef.value?.clientWidth.clientWidth as number
  window.addEventListener('resize', handleResize)
})
onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
let timeOutId: any
const handleResize = () => {
  clearTimeout(timeOutId)
  timeOutId = setTimeout(() => {
    throttle(getDimenSionWidth(), 300)
  }, 300) // 设置一个合适的延迟时间，比如500ms
}
/**
 * 向左滚动
 */
const scrollLeft = () => {
  dimensionWrapperRef.value.scrollLeft -= dimensionWrapperRef.value.offsetWidth
  console.log(dimensionWrapperRef.value.scrollLeft)
}
/**
 * 向右滚动
 */
const scrollRight = () => {
  dimensionWrapperRef.value.scrollLeft += dimensionWrapperRef.value.offsetWidth
}
function throttle(func: any, delay: number) {
  let lastCall = 0
  return function (...args: any[]) {
    const now = new Date().getTime()
    if (now - lastCall < delay) {
      return
    }
    lastCall = now
    func(...args)
  }
}
</script>
<script lang="ts">
export default defineComponent({
  name: 'MyFlex'
})
</script>
<style scoped lang="scss">
.flex-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 100%;
  background-color: antiquewhite;
  margin: 40px;
  .scroll-panel {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
    padding: 12px;
    .scroll-left {
      width: 85%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      background-color: azure;
      padding: 4px;
      .dimension-title {
        background-color: aqua;
        width: fit-content;
      }
      .dimension-wrapper {
        display: flex;
        justify-content: start;
        align-items: center;
        overflow-x: auto;
      }
    }
    .scroll-btn {
      width: 15%;
      background-color: aqua;
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 2px;
    }
  }
}
</style>
