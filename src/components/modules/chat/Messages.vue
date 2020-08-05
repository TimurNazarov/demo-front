<template>
  <div class="chat-module-messages">
    <!-- feed -->
    <!-- input -->
  </div>
</template>

<script>

export default {
  name: 'Messages',
  computed: {
  },
  props: {
    active_contact: {
      type: [Boolean, Number],
      default: false
    },
    messages: {
      type: Array,
      defualt: []
    }
  }
}
</script>
