<template>
  <header>
    <navigation-component/>
    <profile-component v-if="user.loaded"/>
    <select-language/>
  </header>
</template>

<script>
import Navigation from './Navigation'
import Profile from './profile/Profile'
import SelectLanguage from './SelectLanguage'

export default {
  name: 'Header',
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  components: {
    'navigation-component': Navigation,
    'profile-component': Profile,
    'select-language': SelectLanguage
  }
}
</script>
