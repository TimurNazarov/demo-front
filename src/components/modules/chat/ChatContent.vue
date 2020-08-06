<template>
  <div class="chat-module-content">
    <div class="chat-module-messaging">
      <messages/>
      <contacts :contacts="contacts"/>
    </div>
  </div>
</template>

<script>
import Messages from './Messages'
import Contacts from './Contacts'

export default {
  name: 'ChatContent',
  created() {
    // fetch contacts
    this.axios.get(this.$store.getters.api_url+"/contacts")
      .then(res => {
        // set contacts
        this.$store.dispatch('set_contacts', res.data.data)
      })
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    contacts() {
      return this.$store.getters.contacts
    }
  },
  components: {
    'messages': Messages,
    'contacts': Contacts
  }
}
</script>