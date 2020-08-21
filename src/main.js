import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import VueAxios from 'vue-axios'
import axios from 'axios'
import './lang' // multilanguage


Vue.use(VueAxios, axios)
// UTC offset in hours
// console.log( -(new Date().getTimezoneOffset() / 60))
//
// axios config
axios.defaults.headers.common['Accept'] = 'application/json'
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('access_token')
axios.interceptors.response.use(response => {
   return response
}, error => {
  if (error.response.status === 401) {
   localStorage.removeItem('access_token')
   localStorage.removeItem('expires_in')
   router.push('/login')
  }
  return Promise.reject(error)
})

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
