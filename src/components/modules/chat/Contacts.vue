<template>
  <div class="chat-module-contacts">
    <ul class="contact-list">
      <contact-card v-for="contact in contacts" @click="select_contact(contact)" :contact="contact"/>
    </ul>
  </div>
</template>

<script>
import ContactCard from './ContactCard'

export default {
  name: 'Contacts',
  methods: {
    select_contact(contact) {
      // load messages
      this.$emit('contact_selected', contact.id)
    }
  },
  computed: {
    messages() {
      return 1
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
