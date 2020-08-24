<template>
	<div v-if="user.loaded" class="notifications-component">
		<div class="notifications">
			<div class="notification-bell" @click="toggle_notifications" @mouseover="mouseover = true" @mouseleave="mouse_leaves_window('notifications')">
				<i class="fas fa-bell"></i>
				<transition name="fade">
					<i class="fas fa-circle red-circle" ref="red_circle" v-if="unread"></i>
				</transition>
			</div>
			<div v-if="show" class="notifications-feed" @mouseover="mouseover = true" @mouseleave="mouse_leaves_window('notifications')">
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
import HoverWindow from '@/mixins/HoverWindow'

export default {
	name: 'Notifications',
	methods: {
		toggle_notifications() {
			if(this.notifications.length <= 0) {
				// popup message
				let message = this.$ml.get('messages.notifications.empty')
				this.$store.dispatch('show_message_popup', message)
				return
			}
			this.toggle_window('notifications', this.mark_as_read)
		},
		mark_as_read() {
			this.axios.get(this.$store.getters.api_url + '/notifications/read')
				.then(() => {
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
	mixins: [HoverWindow]
}
</script>
