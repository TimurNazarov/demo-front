<template>
  <div class="header-profile-component">
    <noticiations-component/>
    <profile-menu/>
  </div>
</template>

<script>
import Notifications from './notifications/Notifications'
import ProfileMenu from './ProfileMenu'

export default {
  name: 'Profile',
  components: {
    'noticiations-component': Notifications,
    'profile-menu': ProfileMenu
  }
}
</script>
