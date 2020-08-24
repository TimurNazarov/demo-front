<template>
  <div class="friends-page" v-if="user.loaded">
    <ul class="tabs">
      <li @click="switch_tab('/friends')">{{ $ml.get('friends.friends') }}</li>
      <li @click="switch_tab('/friends/requests')">{{ $ml.get('friends.requests') }}</li>
    </ul>
    <div class="container">
      <router-view></router-view>
      <div class="friendable-list" v-if="friendable && $route.path == '/friends'">
        <p>Friendable users</p> <!-- translate -->
        <user-list :users="friendable_merged"/>
      </div>
    </div>
  </div>
</template>

<script>

import UserList from '@/components/layouts/UserList'
// mixins
import Helpers from '@/mixins/Helpers'

export default {
  name: 'Friends',
  beforeCreate() {
    this.$store.dispatch('show_window', 'loader')
  },
  mounted() {
    if(this.friendable_set) {
      this.$store.dispatch('hide_window', 'loader')
    }
  },
  created() {
    // friendable list was already loaded
    if(this.friendable_set) return
    
    // get all non-friend users
    let exclude = this.pluck(this.friendable.new, 'id')
    let body = {
      exclude: exclude
    }
    this.axios.post(this.$store.getters.api_url + '/friendable', body)
      .then(res => {
        this.$store.dispatch('set_friendable_users', res.data.data)
        this.$store.dispatch('hide_window', 'loader')
      })
  },
  methods: {
    switch_tab(route) {
      if(route != this.$route.path) 
        this.$router.push(route)
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    friendable() {
      return this.$store.getters.friendable_users
    },
    friendable_merged() {
      return this.friendable.loaded.concat(this.friendable.new)
    },
    friendable_set() {
      return this.$store.getters.friendable_set
    }
  },
  components: {
    'user-list': UserList
  },
  mixins: [Helpers]
}
</script>