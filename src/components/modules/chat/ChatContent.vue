<template>
  <div class="chat-module-content">
    <div class="chat-module-messaging">
      <messages/>
      <contacts/>
    </div>
  </div>
</template>

<script>
import Messages from './Messages'
import Contacts from './Contacts'
import Helpers from '@/mixins/Helpers'

export default {
  name: 'ChatContent',
  computed: {
    user() {
      return this.$store.getters.user
    }
  },
  components: {
    'messages': Messages,
    'contacts': Contacts
  },
  mixins: [Helpers]
}
</script>