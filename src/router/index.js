import Vue from 'vue'
import VueRouter from 'vue-router'
import WeaponView from '../views/WeaponView.vue'
import GoalsView from '../views/GoalsView.vue'
import ArsenalView from '../views/ArsenalView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'goal',
    component: GoalsView,
    meta: {
      left: 'arsenal',
      right: 'weapon'
    }
  },
  {
    path: '/weapon',
    name: 'weapon',
    component: WeaponView,
    meta: {
      left: 'goal',
      right: 'arsenal'
    }
  },
  {
    path: '/arsenal',
    name: 'arsenal',
    component: ArsenalView,
    meta: {
      left: 'weapon',
      right: 'goal'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  to.meta.transitionName = from.meta.right === to.name ? 'slide-right' : from.meta.left === to.name ? 'slide-left' : 'fade'
  to.meta.nav = {
    left: router.resolve({ name: to.meta.left }).route,
    right: router.resolve({ name: to.meta.right }).route
  }
  next()
})

export default router
