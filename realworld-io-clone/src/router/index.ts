//https://router.vuejs.org/guide/essentials/dynamic-matching.html
//https://github.com/vuejs/vue-router/tree/dev/types
//dynamic segments allow for regex
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '@/views/Home.vue'
import users from '@/store/modules/users'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'login',
    //code splitting
    //spliting vue.js bundle into smaller js files
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('@/views/Register.vue')
  },
  {
    path: '/settings',
    name: 'settings',
    component: () => import('@/views/Settings.vue')
  },
  {
    path: '/editor',
    name: 'editor',
    component: () => import('@/views/Editor.vue')
  },
  {
    path: '/@:username',
    name: 'profile',
    component: () => import('@/views/Profile.vue'),
    props: true
  }
  // Create Not Found Component
  // {
  //   path: '*',
  //   name: 'NotFound',
  //   component: NotFound
  // }
]



const router = new VueRouter({
  mode: "hash",
//base: process.env.BASE_URL,
  routes
})

router.beforeEach( async (to, from, next) => {
  users.loadUser()
    .then(() => {
      console.log(users.user)
      next()
    })
})

export default router
