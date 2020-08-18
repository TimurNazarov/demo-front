<template>
  <div class="notification-content">
    <div class="notification-icon">
      <i class="fas fa-handshake"/>
    </div>
    <div class="notification-info">
      <p class="notification-time">{{ notification.created_at }}</p>
      <p>{{ $ml.with('name', notification.data.name).get('notifications.message_for_type.' + notification.type) }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'IncomingFriendRequest',
  props: {
  	notification: {
  		type: Object,
  		required: true
  	}
  }
}
</script>
