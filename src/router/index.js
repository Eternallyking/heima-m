import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout'),
    redirect: '/ ',
    children: [
      {
        path: '/ ',
        component: () => import('@/views/Home')
      },
      {
        path: 'video',
        component: () => import('@/views/Video')
      },
      {
        path: 'qa',
        component: () => import('@/views/QA')
      },
      {
        path: 'profile',
        component: () => import('@/views/My')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/Login')
  },
  {
    path: '/search',
    component: () => import('@/views/Search')
  },
  {
    path: '/detail',
    component: () => import('@/views/Detail')
  }
]

const router = new VueRouter({
  routes
})

export default router
