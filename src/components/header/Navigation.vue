<template>
  <div class="header-navigation">
    <ul>
      <li><router-link to="/">{{ $ml.get('pages.home') }}</router-link></li>
      <li><router-link to="/friends">{{ $ml.get('pages.friends') }}</router-link></li>
      <li v-if="!user.loaded"><router-link to="/login">{{ $ml.get('pages.login') }}</router-link></li>
      <li v-if="!user.loaded"><router-link to="/register">{{ $ml.get('pages.register') }}</router-link></li>
      <li v-if="user.loaded"><a @click="logout">{{ $ml.get('pages.logout') }}</a></li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Navigation',
    methods: {
      logout() {
        localStorage.removeItem('access_token')
        localStorage.removeItem('expires_at')
        this.$store.reset()
        this.$router.push('/login')
      }
    },
    computed: {
      user() {
        return this.$store.getters.user
      }
    }
}
</script>
