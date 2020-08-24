<template>
  <div class="chat-module-messages-input">
    <textarea class="chat-module-messages-input-text" v-model="message" @keyup="type"></textarea>
    <!-- translate -->
    <div class="btn btn-orange chat-module-messages-input-submit" @click="send">Send</div>
  </div>
</template>

<script>

export default {
  name: 'MessagesInput',
  data() {
    return {
      message: ''
    }
  },
  methods: {
    send() {
      this.$emit('send', this.message)
      this.$root.$emit('chat_module_message_sent');
      this.message = ''
    },
    type(event) {
      if(event.keyCode == 13) {
        // enter(send)
        this.send()
        return
      }
      window.Echo.private('type-to.' + this.active_contact.id)
        .whisper('typing', {
            id: this.user.id
        })
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    active_contact() {
      return this.$store.getters.active_contact
    }
  }
}
</script>
