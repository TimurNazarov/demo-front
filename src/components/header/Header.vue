<template>
  <header>
    <navigation-component/>
    <profile-component/>
  </header>
</template>

<script>
import Navigation from './Navigation'
import Profile from './Profile'
export default {
  name: 'Header',
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  components: {
    'navigation-component': Navigation,
    'profile-component': Profile
  }
}
</script>
