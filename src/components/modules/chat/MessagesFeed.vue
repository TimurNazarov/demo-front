<template>
  <div class="chat-module-messages-feed">
    <div v-for="(messages, date) in merged_messages">
      <p>{{ date }}</p>
      <ul>
        <li v-for="message in merge_dates(date)">{{ message.content }}</li>
      </ul>
    </div>
  </div>
</template>

<script>

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
    }
  },
  computed: {
    merged_messages() {
      return {...this.messages.loaded, ...this.messages.new}
    },
    // merged_messages() {
    //   let loaded_messages = {...this.messages.loaded}
    //   let new_messages = {...this.messages.new}
    //   var merged = {}
    //   console.log(this.messages.loaded)
    //   Object.keys(this.messages.loaded).forEach(date => {
    //     if(this.messages.new[date]) {
    //       merged[date] = {...merged[date], ...this.messages.new[date], ...this.messages.loaded[date]}
    //     } else {
    //       merged[date] = this.messages.loaded[date]
    //     }
    //   })
    //   console.log(merged)
    // }
  },
  props: {
      messages: {
      type: Object,
      defualt: []
    }
  }
}
</script>
