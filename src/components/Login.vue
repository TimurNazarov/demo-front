<template>
  <div class="login-component">
    <div class="container">
      <form>
        <!-- translate -->
        <demo-input label="Email" field="string" v-model="form.email.value" :display_errors="display_errors" @valid="form.email.valid = $event"/>
        <demo-input label="Password" field="string" type="password" v-model="form.password.value" :display_errors="display_errors" @valid="form.password.valid = $event"/>
        <div class="btn btn-default" @click="!submit_blocked ? login() : false">Login</div>
      </form>
      <p v-if="backend_error" class="error-message">{{ backend_error }}</p>
    </div>
  </div>
</template>

<script>

// mixins
import Helpers from '@/mixins/Helpers'
import Form from '@/mixins/Form'

export default {
  name: 'Home',
  data() {
    return {
      form: {
        email: {
          value: '1',
          valid: false
        },
        password: {
          value: '1',
          valid: false
        },
      },
      submit_blocked: false,
      display_errors: false,
      backend_error: false
    }
  },
  methods: {
    login() {
      this.backend_error = false
      this.display_errors = true
      if(!this.are_form_fields_valid(this.form.email, this.form.password)) return
      this.submit_blocked = true
      let form = {
        email: this.form.email.value,
        password: this.form.password.value,
      }
      this.$store.state.user_info_initialized = this.axios.post(this.$store.getters.api_url + '/login', form)
        .then(res => {
          if(res.data.demo_error) {
            this.submit_blocked = false
            this.backend_error = this.$ml.get('demo_errors.' + res.data.demo_error)
            return
          }
          let token = res.data.auth.access_token
          let expires_in = res.data.auth.expires_in
          let timestamp = parseInt(new Date() / 1000)
          localStorage.setItem('access_token', token)
          localStorage.setItem('expires_at', expires_in + timestamp)
          this.axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
          // -- set user
          this.set_user(res.data.user)
          this.$router.push('/')
        })
    }
  },
  mixins: [Helpers, Form]
}
</script>
