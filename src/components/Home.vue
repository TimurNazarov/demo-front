<template>
  <div class="home-page" v-if="user.loaded">
    <img alt="Vue logo" src="@/assets/logo.png">
    <button @click="test">test</button>
  </div>
</template>

<script>

export default {
  name: 'Home',
  created() {
    localStorage.setItem('current_page', 'home')
    document.title = this.$ml.get('pages.home')
  },
  methods: {
  	test() {
      console.log(this.$store.state)
  	}
  },
  computed: {
    user() {
      return this.$store.getters.user
    }
  }
}
</script>
