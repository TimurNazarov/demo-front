<template>
  <div class="chat-module-contacts">
    <ul v-if="friends.length > 0" class="contact-list">
      <contact-card v-for="contact in friends" @clicked="$store.dispatch('update_active_contact', contact)" :key="contact.id" :contact="contact"/>
    </ul>
    <p v-else>{{ $ml.get('chat.no_contacts') }}</p>
  </div>
</template>

<script>
import ContactCard from '../layouts/ContactCard'

export default {
  name: 'Contacts',
  methods: {
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    friends() {
      return this.user.friends.loaded.concat(this.user.friends.new)
    },
    messages() {
      return this.$store.getters.active_contact_messages
    },
    active_contact() {
      return this.$store.getters.active_contact
    }
  },
  components: {
    'contact-card': ContactCard
  }
}
</script>
