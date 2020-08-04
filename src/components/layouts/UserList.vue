<template>
  <div class="user-list-layout">
      <transition-group name="vue-list" class="user-list" tag="ul" @before-leave="before_leave">
        <user-card v-for="user in users"
        class="vue-list-item"
        :key="get_user(user).id"
        :user="get_user(user)"/>
      </transition-group>
  </div>
</template>

<script>

import UserCard from './UserCard'
import TransitionGroupFlexboxFix from '../../mixins/TransitionGroupFlexboxFix'

export default {
  name: 'UserList',
  components: {
    'user-card': UserCard
  },
  methods: {
    added(user, request_id) {
      this.$emit('added', user, request_id)
    },
    get_user(user) {
      if(!this.user_key) 
        return user
      return user[this.user_key]
      
    }
  },
  props: {
    users: {
      type: Array,
      required: true
    },
    user_key: {
      type: [String, Boolean],
      default: false
    }
  },
  mixins: [TransitionGroupFlexboxFix]
}
</script>