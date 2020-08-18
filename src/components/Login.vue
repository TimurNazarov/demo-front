<template>
  <div class="login-component">
    <form>
      <input type="text" placeholder="email" v-model="form.email">
      <input type="password" placeholder="password" v-model="form.password">
      <button @click.prevent="login">Login</button>
    </form>
  </div>
</template>

<script>

// mixins
import Helpers from '../mixins/Helpers'

export default {
  name: 'Home',
    data() {
      return {
        form: {
          email: '1',
          password: '1'
        }
      }
    },
    methods: {
      login() {
        this.$store.state.user_info_initialized = this.axios.post(this.$store.getters.api_url + '/login', this.form)
          .then(res => {
            let token = res.data.auth.access_token
            let expires_in = res.data.auth.expires_in
            let timestamp = parseInt(new Date() / 1000)
            localStorage.setItem('access_token', token)
            localStorage.setItem('expires_at', expires_in + timestamp)
            this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
            // -- set user
            this.set_user(res.data.user)
            // .catch(er => console.log(er.response))
            this.$router.push('/')
          })
          // .catch(er => console.log(er.response))
      }
    },
    mixins: [Helpers]
}
</script>
