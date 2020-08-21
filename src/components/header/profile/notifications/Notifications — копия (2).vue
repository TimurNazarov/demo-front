<template>
  <div v-if="user.loaded" class="notifications-component">
    <div class="notifications">
      <div class="notification-bell" @click="toggle_notifications" @mouseover="mouseover = true" @mouseleave="mouse_leaves">
        <i class="fas fa-bell"></i>
        <transition name="fade">
          <i class="fas fa-circle red-circle" ref="red_circle" v-if="unread"></i>
        </transition>
      </div>
    	<div v-if="show" class="notifications-feed" @mouseover="mouseover = true" @mouseleave="mouse_leaves">
    		<ul>
    			<notification-card v-for="notification in notifications" :key="notification.id" :notification="notification"/>
    		</ul>
    	</div>
    </div>
  </div>
</template>

<script>

// layouts
import NotificationCard from './NotificationCard'

export default {
  name: 'Notifications',
  data() {
  	return {
  		mouseover: false,
  		timeout: null
  	}
  },
  methods: {
  	toggle_notifications() {
      if(this.notifications.length <= 0) {
        // popup message
        let message = this.$ml.get('messages.notifications.empty')
        this.$store.dispatch('show_message_popup', message)
        return
      }
  		if(!this.show) {
        this.$store.dispatch('show_window', 'notifications')
        this.close_notifications()
        // mark notifications as read
        this.mark_as_read()
      } else {
        this.$store.dispatch('hide_window', 'notifications')
      }
  	},
  	mouse_leaves() {
      if(this.show) {
        this.mouseover = !this.mouseover
        this.close_notifications()
      }
  	},
  	close_notifications() {
  		clearTimeout(this.timeout)
  		this.timeout = setTimeout(() => {
  			if(!this.mouseover) {
  				this.$store.dispatch('hide_window', 'notifications')
  			}
  		}, 2000)
  	},
    mark_as_read() {
      this.axios.get(this.$store.getters.api_url + '/notifications/read')
        .then(res => {
          this.notifications.forEach(n => {
            if(n.read_at == null) {
              n.read_at = true
            }
          })
        })
    }
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    notifications() {
    	return this.user.notifications
    },
    show() {
    	return this.$store.getters.show.notifications
    },
    unread() {
      let unread = this.notifications.some(n => {
        return n.read_at == null ? true : false
      })
      return unread
    }
  },
  components: {
  	'notification-card': NotificationCard
  },
}
</script>
