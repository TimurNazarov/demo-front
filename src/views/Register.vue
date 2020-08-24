<template>
  <!-- translate -->
  <div class="register-component">
    <div class="container">
      <form ref="form">
        <demo-input label="Name" field="name" v-model="form.name.value" :display_errors="display_errors" @valid="form.name.valid = $event"/>
        <demo-input label="Email" field="email" v-model="form.email.value" :display_errors="display_errors" @valid="form.email.valid = $event"/>
        <demo-input label="Password" field="password" type="password" v-model="form.password.value" :display_errors="display_errors" @valid="form.password.valid = $event"/>
        <label class="form-label">
          <p class="form-label-message">profile picture</p>
          <dropzone @file_added="form.profile_picture_file = $event"/>
          <p v-if="form.profile_picture_file.preview" class="form-label-message">Preview</p>
          <img v-if="form.profile_picture_file.preview" class="form-preview-image" :src="form.profile_picture_file.preview" style="max-width: 100px;">
        </label>

        <div class="btn btn-default" @click="!submit_blocked ? submit() : false">
          <demo-loader :show="submit_blocked" :size="30"/>
          <span v-if="!submit_blocked">Submit</span>
        </div>
      </form>
      <p v-if="backend_error" class="error-message">{{ backend_error }}</p>
    </div>
  </div>
</template>

<script>
// modules
import Loader from '@/components/modules/loader/Loader'
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
      },
      submit_blocked: false,
      display_errors: false,
      backend_error: false
    }
  },
  methods: {
    submit() {
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
  components: {
    'demo-loader': Loader
  },
  mixins: [Form]
}
</script>
