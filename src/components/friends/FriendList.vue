<template>
  <div class="friend-list-component">
    <div class="friend-list">
      <user-list :users="friends" />
    </div>
  </div>
</template>

<script>

import UserList from '../layouts/UserList'

export default {
  name: 'FriendList',
  created() {
    localStorage.setItem('current_page', 'friends')
    document.title = this.$ml.get('pages.friends')
  },
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