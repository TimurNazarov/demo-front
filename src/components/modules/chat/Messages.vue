<template>
  <div class="chat-module-messages">
    <messages-feed v-if="messages" :messages="messages"/>
    <!-- input -->
  </div>
</template>

<script>
import MessagesFeed from './MessagesFeed'

export default {
  name: 'Messages',
  created() {
  },
  computed: {
    active_contact() {
      return this.$store.getters.active_contact
    },
    messages() {
      return this.$store.getters.active_contact_messages
    }
  },
  components: {
    'messages-feed': MessagesFeed
  }
}
</script>
