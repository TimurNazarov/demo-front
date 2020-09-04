import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)
// router routes
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home'),
    meta: {
      ml_path: 'home'
    }
  },
  {
    path: '/friends',
    // name: 'Friends',
    component: () => import('@/views/Friends'),
    children: [
      {
        path: '',
        name: 'Friends',
        component: () => import('@/components/friends/FriendList'),
        meta: {
          ml_path: 'friends'
        }
      },
      {
        path: 'requests',
        name: 'Friend Requests',
        component: () => import('@/components/friends/FriendRequests'),
        meta: {
          ml_path: 'friend_requests'
        }
      }
    ]
  },
  {
    path: '/profile/:id',
    name: 'User profile',
    component: () => import('@/views/UserProfile')
  },
  {
    path: '/posts/search',
    name: 'Posts search',
    component: () => import('@/views/PostsSearch'),
    meta: {
      ml_path: 'posts_search'
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
    meta: {
      for_visitors: true,
      ml_path: 'login'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import('@/views/Register'),
    meta: {
      for_visitors: true,
      ml_path: 'register'
    }
  },
  {
    path: '/banner-message/:message_type/:banner_type',
    name: 'BannerMessage',
    component: () => import('@/views/BannerMessage'),
    meta: {
      for_visitors: true,
      ml_path: 'banner_message'
    }
  },
  {
    path: '/404',
    name: 'Page not found',
    component: () => import('@/views/PageNotFound'),
    meta: {
      ml_path: 'page_not_found'
    }
  },
  {
    path: '*',
    redirect: '/404'
  }
]
// router init
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  var logged = localStorage.getItem('access_token')
  var redirect_route_name
  if(!logged && !to.meta.for_visitors) {
    redirect_route_name = 'Login'
  } else if(logged && to.meta.for_visitors) {
    redirect_route_name = 'Home'
  }
  next({name: redirect_route_name})
})
export default router