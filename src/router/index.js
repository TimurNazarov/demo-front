import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
// router routes
const routes = [
  {
    path: '/',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Home')
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/components/Test.vue')
  },
  {
    path: '/friends',
    // name: 'Friends',
    component: () => import('@/components/Friends'),
    children: [
      {
        path: '',
        name: 'Friends',
        component: () => import('@/components/friends/FriendList'),
      },
      {
        path: 'requests',
        name: 'Friend Requests',
        component: () => import('@/components/friends/FriendRequests'),
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/components/Login'),
    meta: {
      for_visitors: true
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/components/Register'),
    meta: {
      for_visitors: true
    }
  }
]
// router init
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  let logged = localStorage.getItem('access_token')
  let redirect_route_name
  if(!logged && !to.meta.for_visitors) {
    redirect_route_name = 'Login'
  } else if(logged && to.meta.for_visitors) {
    redirect_route_name = 'Home'
  }
  next({name: redirect_route_name})
})
// router.afterEach((to, from) => {
//   // document.title = to.name
// })
export default router