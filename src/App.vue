<template>
  <div id="app">
    <transition name="openup">
      <div class="message-popup" v-if="message_popup.show">{{ message_popup.message }}</div>
    </transition>
    <chat-module/>
  	<header-component/>
    <router-view/>
  </div>
</template>

<script>
//packages
// --
// components
import Header from './components/header/Header'
// modules
import ChatModule from './components/modules/chat/Chat'
// mixins
import Helpers from './mixins/Helpers'

export default {
  created() {
    let logged = localStorage.getItem('access_token')
    if(logged) {
      // -- load user
      this.$store.state.user_info_initialized = this.axios.get(this.$store.getters.api_url+"/user/get")
      .then(res => this.set_user(res.data.data))
      // .catch(er => console.log(er.response))
    }
  },
  computed: {
    message_popup() {
      return this.$store.getters.message_popup
    }
  },
  components: {
    'header-component': Header,
    'chat-module': ChatModule
  },
	mixins: [Helpers]
}
</script>

<style lang="scss">
@import 'assets/styles/main.scss';
</style>
