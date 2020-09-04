<template>
  <div class="chat-module" v-if="user.loaded">
    <div v-if="unread > 0 && !show" class="unread-circle">
      <i class="fas fa-circle"></i>
      <span>{{ unread }}</span>
    </div>
    <div v-if="!show" class="chat-module-open" @click="show_module"><i class="fas fa-comment-dots"></i></div>
    <div v-if="show" class="chat-module-close" @click="hide_module"><i class="fa fa-times"></i></div>
    <chat-content v-if="show"/>
  </div>
</template>

<script>
import ChatContent from './ChatContent'
import Helpers from '@/mixins/Helpers'

export default {
  name: 'Chat',
  methods: {
    show_module() {
      this.$store.dispatch('show_window', 'chat_module')
    },
    hide_module() {
      this.$store.dispatch('hide_window', 'chat_module')
    },
    select_contact(contact) {
      // if not loaded yet
      if(!this.messages || !this.messages.loaded.length) {
        let contact_messages = this.$store.getters.contact_messages(contact)
        var exclude
        if(contact_messages && contact_messages.new) {
          exclude = this.pluck_nested_messages(contact_messages.new, 'id')
        } else {
          exclude = []
        }
        // if first time selected 
        if(contact.initial_select) {
          // load messages
          let body = {
            contact_id: contact.id,
            exclude: exclude,
            page: contact.page,
            initial: contact.initial_select
          }
          this.axios.post(this.$store.getters.api_url+"/messages", body)
            .then(res => {
              let data = {
                contact_id: contact.id,
                messages: res.data
              }
              this.$store.dispatch('set_contact_messages', data)
            })
          this.$store.dispatch('contact_is_selected', contact)
          // else just mark new messages as read
        } else {
          let mark_as_read_body = {
            contact_id: contact.id,
            new: true
          }
          this.axios.post(this.$store.getters.api_url+"/messages/mark-as-read", mark_as_read_body)
        }
      }
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    show() {
      return this.$store.getters.show.chat_module
    },
    unread() {
      return this.$store.getters.chat_total_unread
    },
    active_contact() {
      return this.$store.getters.active_contact
    }
  },
  watch: {
    active_contact(new_active_contact) {
      if(new_active_contact) {
        this.select_contact(new_active_contact)
      }
    }
  },
  components: {
    'chat-content': ChatContent
  },
  mixins: [Helpers]
}
</script>

<style lang="scss">
  @import '@/assets/styles/components/chat-module.scss';
</style>