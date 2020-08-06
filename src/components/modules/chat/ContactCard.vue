<template>
  <div class="chat-module-contact" @click="$emit('clicked')">
    <img class="chat-module-contact-profile-picture" :src="contact.profile_picture_url" :alt="contact.name">
    <div class="chat-module-contact-info">
      <div class="chat-module-contact-name">
        <span>{{ contact.name }}</span>
        <span>time</span>
      </div>
      <p v-if="contact.last_private_message" class="chat-module-contact-last-message">{{ this.cut_string(contact.last_private_message.content, 30) }}</p>
      <p v-else class="chat-module-contact-last-message">No messages</p>  <!-- translate -->
    </div>
  </div>
</template>

<script>
import Helpers from '../../../mixins/Helpers'

export default {
  name: 'ContactCard',
  props: {
    contact: {
      type: Object,
      required: true
    }
  },
  mixins: [Helpers]
}
</script>
