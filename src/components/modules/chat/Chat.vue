<template>
  <div class="chat-module" v-if="user.loaded">
    <!-- <div class="chat-module-button"></div> -->
    <chat-content/>
  </div>
</template>

<script>
import ChatContent from './ChatContent'

export default {
  name: 'Chat',
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  components: {
    'chat-content': ChatContent
  }
}
</script>

<style lang="scss">
  @import '@/assets/styles/components/chat-module.scss';
</style>