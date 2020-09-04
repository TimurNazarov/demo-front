<template>
  <div class="register-component">
    <div class="container">
      <form>
        <demo-input v-model="form.name.value" 
        :label="$ml.get('form.input.name')" 
        field="name" 
        :display_errors="display_errors" 
        @valid="form.name.valid = $event"/>
        <demo-input v-model="form.email.value" 
        :label="$ml.get('form.input.email')" 
        field="email" 
        :display_errors="display_errors"
        @valid="form.email.valid = $event"/>
        <demo-input v-model="form.password.value" 
        :label="$ml.get('form.input.password')" 
        field="password" 
        type="password" 
        :display_errors="display_errors" 
        @valid="form.password.valid = $event"/>
        <div class="form-label">
          <p class="form-label-message">profile picture</p>
          <dropzone @file_added="form.profile_picture_file = $event"/>
          <p v-if="form.profile_picture_file.preview" class="form-label-message">Preview</p>
          <img v-if="form.profile_picture_file.preview" class="form-preview-image" :src="form.profile_picture_file.preview">
        </div>
        <demo-submit :submit_blocked="submit_blocked" :button_text="$ml.get('form.button.register')" @submitted="register"/>
        <p v-if="backend_error" class="error-message">{{ backend_error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
// mixins
import Form from '@/mixins/Form'

export default {
  name: 'Register',
  data() {
    return {
      form: {
        name: {
          value: '',
          valid: false
        },
        email: {
          value: '',
          valid: false
        },
        password: {
          value: '',
          valid: false
        },
        profile_picture_file: {}
      }
    }
  },
  methods: {
    register() {
      this.display_errors = true
      this.backend_error = false
      if(!this.are_form_fields_valid(this.form.name, this.form.email, this.form.password)) return
      this.submit_blocked = true
      const body = new FormData
      body.append('locale', localStorage.getItem('vueml-lang'))
      body.append('name', this.form.name.value)
      body.append('email', this.form.email.value)
      body.append('password', this.form.password.value)
      // if image set
      if(Object.keys(this.form.profile_picture_file).length > 0) {
        body.append('profile_picture_file', this.form.profile_picture_file)
      }
      this.axios.post(this.$store.getters.api_url + '/register', body)
        .then(res => {
          if(res.data.demo_error) {
            this.submit_blocked = false
            this.backend_error = this.$ml.get('demo_errors.' + res.data.demo_error)
          } else {
            this.$router.push('/banner-message/registration/success')
          }
        })
    },
  },
  mixins: [Form]
}
</script>
