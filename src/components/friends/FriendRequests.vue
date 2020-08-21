<template>
  <div class="friend-requests-component">
      <ul class="friend-requests">
        <div v-if="incoming_friend_requests.length" class="incoming-friend-requests">
          <p>Incoming</p> <!-- translate -->
          <user-list :users="incoming_friend_requests" :user_key="'from'"/>
        </div>
        <div v-if="outgoing_friend_requests.length" class="outgoing-friend-requests">
          <p>Outgoing</p> <!-- translate -->
          <user-list :users="outgoing_friend_requests"  :user_key="'to'"/>
        </div>
      </ul>
  </div>
</template>

<script>

import UserList from '@/components/layouts/UserList'

export default {
  name: 'FriendRequests',
  created() {
    localStorage.setItem('current_page', 'requests')
    document.title = this.$ml.get('pages.requests')
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    incoming_friend_requests() {
      return this.user.friend_requests.incoming.loaded.concat(this.user.friend_requests.incoming.new)
    },
    outgoing_friend_requests() {
      return this.user.friend_requests.outgoing
    },
  },
  components: {
    'user-list': UserList
  }
}
</script>