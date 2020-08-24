<template>
  <div :class="{'chat-module-contact': true, 'chat-module-contact-active': contact.id == active_contact.id }" @click="$emit('clicked')">
    <img class="chat-module-contact-profile-picture" :src="profile_picture_url(contact.profile_picture_url)" :alt="contact.name">
    <div class="chat-module-contact-info">
      <div class="chat-module-contact-name-info">
        <span class="chat-module-contact-name">{{ contact.name }}</span>
        <span v-if="contact.last_private_message" class="chat-module-contact-last-message-time">{{ contact.last_private_message.time }}</span>
      </div>
      <!-- translate -->
      <div class="contact-typing" v-if="contact.typing"><span>{{ contact.name }} is typing...</span><i class="fas fa-pencil-alt"></i></div>
      <div v-else-if="contact.last_private_message" class="chat-module-contact-last-message">
        <span>{{ this.cut_string(contact.last_private_message.content, 30) }}</span>
        <div v-if="contact.unread_count > 0" class="unread-circle">
          <i class="fas fa-circle"></i>
          <span>{{ contact.unread_count }}</span>
        </div>
        
      </div>
      <p v-else class="chat-module-contact-last-message">No messages</p>  <!-- translate -->
    </div>
  </div>
</template>

<script>
import Helpers from '@/mixins/Helpers'

export default {
  name: 'ContactCard',
  computed: {
    active_contact() {
      return this.$store.getters.active_contact
    }
  },
  props: {
    contact: {
      type: Object,
      required: true
    }
  },
  mixins: [Helpers]
}
</script>
