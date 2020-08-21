<template>
  <div class="chat-module-messages-feed">
    <div class="chat-module-messages-feed-overflow" ref="messages_window">
      <div v-for="(messages, date) in merged_messages" class="chat-module-messages-feed-output">
        <div class="chat-module-messages-feed-date">
          <div class="messages-feed-date-day-floating">{{ handle_date(date) }}</div>
          <div class="messages-feed-date-day">{{ handle_date(date) }}</div>
          <ul class="chat-module-date-message-list">
            <message-card v-for="message in merge_dates(date)" :key="message.id" :message="message"/>
          </ul>
        </div>
      </div>
      <!-- translate -->
      <div class="contact-typing" v-if="active_contact.typing"><span>{{ active_contact.name }} is typing...</span><i class="fas fa-pencil-alt"></i></div>
    </div>
  </div>
</template>

<script>

import MessageCard from './MessageCard'
import Helpers from '@/mixins/Helpers'
import MessagesFeedScroll from '@/mixins/MessagesFeedScroll'
import moment from 'moment'

export default {
  name: 'MessagesFeed',
  methods: {
    handle_date(date) {
      var moment_utc =  moment.utc()
      var date = moment.utc(date, 'DD-MM-yy')
      // is today
      if(moment_utc.isSame(date, 'day')) {
        return this.$ml.get('messaging.date.today')
        // is yesterday
      } else if(moment_utc.subtract(1, 'days').isSame(date, 'day')) {
        return this.$ml.get('messaging.date.yesterday')
        // is current year
      } else if(moment_utc.isSame(date, 'year')) {
        return date.format('D') + ' ' + this.$ml.get('messaging.date.' + (date.month() + 1))
        // else return full date
      } else {
        return date.format('D') + ' ' + this.$ml.get('messaging.date.' + (date.month() + 1)) + ' ' + date.year()
      }
    },
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
      if(contact_messages && contact_messages.new) {
        var exclude = this.pluck_nested_messages(contact_messages.new, 'id')
      } else {
        var exclude = []
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
