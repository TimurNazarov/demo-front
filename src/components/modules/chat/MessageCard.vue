<template>
  <li :class="{ 'chat-module-message': true, 'chat-module-outgoing-message': is_outgoing }">
    <div class="chat-module-message-content">
      {{ message.content }}
      <div class="chat-module-message-info">
        <span class="chat-module-message-seen" v-if="is_outgoing">
          <i :class="{ 'far': true, 'fa-check': true, 'chat-module-message-has-seen': message.seen }"></i>
        </span>
        <span class="chat-module-message-time">{{ message.time }}</span>
      </div>
    </div>
  </li>
</template>

<script>

export default {
  name: 'MessageCard',
  computed: {
    user() {
      return this.$store.getters.user
    },
    is_outgoing() {
      return this.message.from == this.user.id ? true : false
    }
  },
  props: {
    message: {
      type: Object,
      required: true
    }
  }
}
</script>
