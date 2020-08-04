<template>
  <div class="notification notification-friend-request">
    123
  </div>
</template>

<script>

export default {
  name: 'FriendRequest',
  computed: {
    user() {
      return this.$store.getters.user
    }
  }
}
</script>
