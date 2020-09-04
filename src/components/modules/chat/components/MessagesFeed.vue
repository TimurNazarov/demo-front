<template>
  <div class="chat-module-messages-feed">
    <div class="chat-module-messages-feed-overflow" ref="messages_window">
      <div v-for="(messages, date) in merged_messages" :key="date" class="chat-module-messages-feed-output">
        <div class="chat-module-messages-feed-date">
          <div class="messages-feed-date-day-floating">{{ format_date(date) }}</div>
          <div class="messages-feed-date-day">{{ format_date(date) }}</div>
          <ul class="chat-module-date-message-list">
            <message-card v-for="message in merge_dates(date)" :key="message.id" :message="message"/>
          </ul>
        </div>
      </div>
      <div class="contact-typing" v-if="active_contact.typing"><span>{{ active_contact.name }} {{ $ml.get('chat.is_typing') }}...</span><i class="fas fa-pencil-alt"></i></div>
    </div>
  </div>
</template>

<script>

import MessageCard from '../layouts/MessageCard'
import Helpers from '@/mixins/Helpers'
import MessagesFeedScroll from '@/mixins/MessagesFeedScroll'

export default {
  name: 'MessagesFeed',
  methods: {
    merge_dates(date) {
      if(this.messages.loaded[date] && this.messages.new[date]) {
        return [...this.messages.loaded[date], ...this.messages.new[date]]
      } else if(this.messages.loaded[date]) {
        return this.messages.loaded[date]
      } else if(this.messages.new[date]) {
        return this.messages.new[date]
      }
    },
    paginate() {
      // load messages
      let contact_messages = this.active_contact_messages
      var exclude
      if(contact_messages && contact_messages.new) {
        exclude = this.pluck_nested_messages(contact_messages.new, 'id')
      } else {
        exclude = []
      }
      this.active_contact.page++
      let body = {
        contact_id: this.active_contact.id,
        exclude: exclude,
        page: this.active_contact.page
      }
      this.axios.post(this.$store.getters.api_url+"/messages", body)
        .then(res => {
          let data = {
            contact_id: this.active_contact.id,
            messages: res.data
          }
          this.$store.dispatch('load_contact_messages', data)
          this.new_page_loading = false
        })
    }
  },
  computed: {
    merged_messages() {
      return {...this.messages.loaded, ...this.messages.new}
    },
    active_contact() {
      return this.$store.getters.active_contact
    },
    active_contact_messages() {
      return this.$store.getters.active_contact_messages
    }
  },
  props: {
      messages: {
      type: Object,
      defualt: []
    }
  },
  components: {
    'message-card': MessageCard
  },
  mixins: [Helpers, MessagesFeedScroll]
}
</script>
