<template>
  <div class="header-navigation">
    <ul>
      <li class="header-logo-wrapper"><router-link to="/" class="header-logo-link"><img class="logo header-logo" src="@/assets/logo.png" alt=""></router-link></li>
      <li><router-link to="/">{{ $ml.get('pages.home') }}</router-link></li>
      <li v-if="user.loaded"><router-link to="/friends">{{ $ml.get('pages.friends') }}</router-link></li>
      <li v-if="!user.loaded"><router-link to="/login">{{ $ml.get('pages.login') }}</router-link></li>
      <li v-if="!user.loaded"><router-link to="/register">{{ $ml.get('pages.register') }}</router-link></li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Navigation',
    computed: {
      user() {
        return this.$store.getters.user
      }
    }
}
</script>
