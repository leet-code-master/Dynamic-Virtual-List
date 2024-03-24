import { createRouter, createWebHistory } from 'vue-router'
import DynamicVirtualList from '@/components/DynamicVirtualList/index.vue'
import example from '@/components/Example/index.vue'

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
      name: 'DynamicVirtualList',
      component: DynamicVirtualList
    }
  ]
})

export default router
