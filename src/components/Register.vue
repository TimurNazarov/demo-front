<template>
  <!-- translate -->
  <div class="register-component">
    <div class="container">
      <form ref="form">
        <label class="form-label">
          <p class="form-label-message">Name</p>
          <input class="form-input" type="text" v-model="form.name">
        </label>
        <label class="form-label">
          <p class="form-label-message">Email</p>
          <input class="form-input" type="text" v-model="form.email">
        </label>
        <label class="form-label">
          <p class="form-label-message">Password</p>
          <input class="form-input" type="text" v-model="form.password">
        </label>
        <dropzone @file_added="form.profile_picture_file = $event"/>
        <img class="form-preview-image" :src="form.profile_picture_file.preview" style="max-width: 100px;">

        <div class="btn btn-default" @click="submit">Submit</div>
      </form>
    </div>
  </div>
</template>

<script>

// mixins
import Helpers from '@/mixins/Helpers'
import Dropzone from '@/components/modules/dropzone/Dropzone'

export default {
  name: 'Register',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        profile_picture_file: {}
      }
    }
  },
  methods: {
    submit() {
      const body = new FormData
      body.append('name', this.form.name)
      body.append('email', this.form.email)
      body.append('password', this.form.password)
      body.append('profile_picture_file', this.form.profile_picture_file)
      this.axios.post(this.$store.getters.api_url + '/register', body)
        .then(res => {
          console.log(res)
        })
    }
  },
  components: {
    'dropzone': Dropzone
  }
}
</script>
