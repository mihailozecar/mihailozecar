import { createWebHistory, createRouter } from 'vue-router'
import routes from '@/util/routes.js'

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
