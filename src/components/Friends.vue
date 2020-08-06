<template>
  <div class="friends-page" v-if="user.loaded">
    <ul class="tabs">
      <li @click="switch_tab('/friends')">{{ $ml.get('friends.friends') }}</li>
      <li @click="switch_tab('/friends/requests')">{{ $ml.get('friends.requests') }}</li>
    </ul>
    <!-- <component :is="tab_map_reverse[$route.path]"/> -->
    <router-view></router-view>
    <div class="friendable-list" v-if="friendable && $route.path == '/friends'">
      <p>Friendable users</p> <!-- translate -->
      <user-list :users="friendable"/>
    </div>
  </div>
</template>

<script>

import FriendList from './friends/FriendList'
import FriendRequests from './friends/FriendRequests'
import UserList from './layouts/UserList'
// mixins
import Helpers from '../mixins/Helpers'

export default {
  name: 'Friends',
  created() {
    if(this.$route.params.tab == 'requests') {
      this.active_tab = 'friend-requests'
    }
    // get all non-friend users
    let exclude = this.pluck(this.friendable, 'id')
    let body = {
      exclude: exclude
    }
    this.axios.post(this.$store.getters.api_url + '/friendable', body)
      .then(res => {
        this.$store.dispatch('set_friendable_users', res.data.data)
      })
  },
  methods: {
    switch_tab(route) {
      if(route != this.$route.path) 
        this.$router.push(route)
    }
  },
  data() {
    return {
      active_tab: 'friend-list',
      tab_map: {
        'friend-list': '/friends',
        'friend-requests': '/friends/requests'
      },
      tab_map_reverse: {
        '/friends': 'friend-list',
        '/friends/requests': 'friend-requests'
      },
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    friendable() {
      return this.$store.getters.friendable_users
    }
  },
  components: {
    'friend-list': FriendList,
    'friend-requests': FriendRequests,
    'user-list': UserList
  },
  mixins: [Helpers]
}
</script>