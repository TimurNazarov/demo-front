<template>
  <div class="notification notification-dummy">
    dummy
  </div>
</template>

<script>

export default {
  name: 'Dummy',
  computed: {
    user() {
      return this.$store.getters.user
    }
  }
}
</script>
