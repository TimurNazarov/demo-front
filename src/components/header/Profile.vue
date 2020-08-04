<template>
  <div class="header-profile">
    <select-language/>
    <noticiations-component/>
    <p v-if="user">Hello, <span>{{ user.name }}</span></p>
  </div>
</template>

<script>
import Notifications from './notifications/Notifications'
import SelectLanguage from './SelectLanguage'

export default {
  name: 'Profile',
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  components: {
    'noticiations-component': Notifications,
    'select-language': SelectLanguage
  }
}
</script>
