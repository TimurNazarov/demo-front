<template>
  <li class="user-card">
    <div class="user-card-profile-picture-wrapper" @click="navigate_to_profile">
      <img class="user-card-profile-picture" :src="profile_picture_url(user.profile_picture_url)" :alt="user.name">
    </div>
    <div class="user-info">
      <p class="user-name" @click="navigate_to_profile">{{ user.name }}</p>
      <user-actions-panel v-if="logged_user.id != user.id" :user="user"/>
    </div>
  </li>
</template>

<script>
// layouts
import UserActionsPanel from './UserActionsPanel'
// mixins
import Helpers from '@/mixins/Helpers'

export default {
  name: 'UserCard',
  methods: {
    navigate_to_profile() {
      document.title = this.user.name
      this.$router.push('/profile/' + this.user.id)
    }
  },
  computed: {
    logged_user() {
      return this.$store.getters.user
    }
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  components: {
    'user-actions-panel': UserActionsPanel
  },
  mixins: [Helpers]
}
</script>
