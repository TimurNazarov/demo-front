<template>
  <div class="friend-list-component">
    <div class="friend-list">
      <user-list :users="friends" />
    </div>
  </div>
</template>

<script>
// layouts
import UserList from '@/components/layouts/UserList'

export default {
  name: 'FriendList',
  computed: {
    user() {
      return this.$store.getters.user
    },
    friends() {
      return this.user.friends.loaded.concat(this.user.friends.new)
    }
  },
  components: {
    'user-list': UserList
  }
}
</script>