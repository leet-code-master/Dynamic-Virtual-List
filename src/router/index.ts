import { createRouter, createWebHistory } from 'vue-router'
import VirtualList from '@/components/VirtualList/index.vue'
import DynamicVirtualList from '@/components/DynamicVirtualList/index.vue'
import example from '@/components/Example/index.vue'
import MyCascader from '@/views/MyCascader/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/example'
    },
    {
      path: '/example',
      name: 'example',
      component: example
    },
    {
      path: '/list',
      name: 'VirtualList',
      component: VirtualList
    },
    {
      path: '/dynamic-virtual-list',
      name: 'DynamicVirtualList',
      component: DynamicVirtualList
    },
    {
      path: '/cascader',
      name: 'Cascader',
      component: MyCascader
    },
    {
      path: '/flex',
      name: 'Flex',
      component: () => import('@/components/MyFlex/index.vue')
    }
  ]
})

export default router
