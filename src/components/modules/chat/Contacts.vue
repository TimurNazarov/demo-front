<template>
  <div class="chat-module-contacts">
    <ul class="contact-list">
      <contact-card v-for="contact in contacts" @clicked="select_contact(contact)" :key="contact.id" :contact="contact"/>
    </ul>
  </div>
</template>

<script>
import ContactCard from './ContactCard'

export default {
  name: 'Contacts',
  methods: {
    select_contact(contact) {
      // if not loaded yet
      if(!this.messages || !this.messages.loaded.length) {
        // load messages
        let exclude = [] // --fix--(add)
        let body = {
          contact_id: contact.id,
          exclude: exclude
        }
        this.axios.post(this.$store.getters.api_url+"/messages", body)
          .then(res => {
            let data = {
              contact_id: contact.id,
              messages: res.data
            }
            this.$store.dispatch('set_contact_messages', data)
          })
      }
      this.$store.dispatch('update_active_contact', contact)
    }
  },
  computed: {
    messages() {
      return this.$store.getters.active_contact_messages
    }
  },
  props: {
    contacts: {
      type: Array,
      defualt: []
    }
  },
  components: {
    'contact-card': ContactCard
  }
}
</script>
