<template>
  <div class="login-component">
    <div class="container">
      <form @submit.prevent="!submit_blocked ? login() : false">
        <demo-input v-model="form.email.value" 
        :label="$ml.get('form.input.email')" 
        field="string" 
        :display_errors="display_errors" 
        @valid="form.email.valid = $event"/>
        <demo-input v-model="form.password.value" 
        :label="$ml.get('form.input.password')" 
        field="string" 
        type="password" 
        :display_errors="display_errors" 
        @valid="form.password.valid = $event"/>
        <demo-submit :submit_blocked="submit_blocked" :button_text="$ml.get('form.button.login')" @submitted="login"/>
        <p v-if="backend_error" class="error-message">{{ backend_error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
// static
import static_data from '@/static/static.json'
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
      }
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
      this.$store.state.user_info_initialized = this.axios.post(static_data.backend_api_url + '/login', form)
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
