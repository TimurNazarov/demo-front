<template>
  <div class="chat-module-messages">
    <!-- if contact messages set and loaded -->
    <!-- <messages-feed v-if="messages && Object.keys(messages.loaded).length && active_contact || messages && Object.keys(messages.new).length && active_contact" :messages="messages"/> -->
    <messages-feed v-if="messages && (Object.keys(messages.loaded).length || Object.keys(messages.new).length) && active_contact" :messages="messages"/>
    <!-- translate -->
    <div v-if="!active_contact">Select contact</div>
    <messages-input v-if="active_contact" @send="send"/>
  </div>
</template>

<script>
import MessagesFeed from './MessagesFeed'
import MessagesInput from './MessagesInput'
import moment from 'moment'

export default {
  name: 'Messages',
  methods: {
    send(message) {
      let body = {
        to: this.active_contact.id,
        content: message
      }
      this.axios.post(this.$store.getters.api_url+"/message/send", body)
        .then(res => {
          let new_message = res.data.data
          let data = {
            contact_id: new_message.to,
            message: new_message
          }
          this.$store.dispatch('add_new_message', data)
        })
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    active_contact() {
      return this.$store.getters.active_contact
    },
    messages() {
      return this.$store.getters.active_contact_messages
    }
  },
  components: {
    'messages-feed': MessagesFeed,
    'messages-input': MessagesInput
  }
}
</script>
