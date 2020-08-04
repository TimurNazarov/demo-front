<template>
  <div class="notifications-component">
    <div class="notifications">
      <div class="notification-bell" @click="toggle_notifications" @mouseover="mouseover = true" @mouseleave="mouse_leaves">
        <i class="fas fa-bell"></i>
        <transition name="fade">
          <i class="fas fa-circle red-circle" ref="red_circle" v-if="unread"></i>
        </transition>
      </div>
    	<div v-if="show" class="notifications-feed" @mouseover="mouseover = true" @mouseleave="mouse_leaves">
    		<ul>
    			<li v-for="n in notifications" class="notification-element">
            <transition name="fade">
              <i class="fas fa-circle red-circle" v-if="n.read_at == null"></i>
            </transition>
    				<component :is="n.type"></component>
    			</li>
    		</ul>
    	</div>
    </div>
  </div>
</template>

<script>

// layouts
import FriendRequest from './layouts/FriendRequest'
import Dummy from './layouts/Dummy'
// mixins

import UI from '../../../mixins/ui'

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
      let notifications = this.$store.getters.modals.notifications
  		if(!notifications) {
        this.$store.dispatch('open_modal', 'notifications')
        this.close_notifications()
        // mark notifications as read
        this.mark_as_read()
      } else {
        this.$store.dispatch('close_modal', 'notifications')
      }
  	},
  	mouse_leaves() {
  		this.mouseover = !this.mouseover
  		this.close_notifications()
  	},
  	close_notifications() {
  		clearTimeout(this.timeout)
  		this.timeout = setTimeout(() => {
  			if(!this.mouseover) {
  				this.$store.dispatch('close_modal', 'notifications')
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
    	return this.user.notifications.loaded.concat(this.user.notifications.new)
    },
    show() {
    	return this.$store.getters.modals.notifications
    },
    unread() {
      let unread = this.notifications.some(n => {
        return n.read_at == null ? true : false
      })
      return unread
    }
  },
  components: {
  	'FriendRequest': FriendRequest,
  	'Dummy': Dummy,
  },
  mixins: [UI]
}
</script>
