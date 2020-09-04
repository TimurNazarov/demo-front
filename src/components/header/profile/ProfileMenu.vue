<template>
  <div class="header-profile-menu-component">
    <div class="header-profile-menu">
      <div class="profile-menu-picture" @click="toggle_window('profile_menu')" @mouseover="mouseover = true" @mouseleave="mouse_leaves_window('profile_menu')">
        <img class="profile-menu-picture-image" :src="profile_picture_url(user.profile_picture_small)" :alt="user.name">
        <i class="fas fa-caret-down"></i>
      </div>
      <div v-if="show" class="profile-menu-list" @mouseover="mouseover = true" @mouseleave="mouse_leaves_window('profile_menu')">
        <div class="profile-logged-as">
          <p>{{ $ml.get('profile.logged_as') }}</p>
          <p>{{ user.name }}</p>
        </div>
        <ul>
          <li><a @click.prevent="view_profile">{{ $ml.get('pages.my_profile') }}</a></li>
          <li><a @click.prevent="logout">{{ $ml.get('pages.logout') }}</a></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
// mixins
import HoverWindow from '@/mixins/HoverWindow'
import Helpers from '@/mixins/Helpers'

export default {
  name: 'ProfileMenu',
  methods: {
    view_profile() {
      this.$store.dispatch('hide_window', 'profile_menu')
      this.$router.push('/profile/' + this.user.id)
    },
    logout() {
      localStorage.removeItem('access_token')
      localStorage.removeItem('expires_at')
      this.$store.reset()
      this.$store.dispatch('hide_window', 'loader')
      this.$router.push('/login')
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    show() {
      return this.$store.getters.show.profile_menu
    },
  },
  mixins: [HoverWindow, Helpers]
}
</script>
