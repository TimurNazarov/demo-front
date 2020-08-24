<template>
	<li class="notification-element">
		<transition name="fade">
			<i class="fas fa-circle red-circle" v-if="notification.read_at == null"></i>
		</transition>
		<component :is="notification.type" :notification="notification"></component>
	</li>
</template>

<script>
import IncomingFriendRequest from './layouts/IncomingFriendRequest'
import FriendRequestAccepted from './layouts/FriendRequestAccepted'
import Dummy from './layouts/Dummy'

export default {
	name: 'NotificationCard',
	props: {
		notification: {
			type: Object,
			required: true
		}
	},
	components: {
		'IncomingFriendRequest': IncomingFriendRequest,
		'FriendRequestAccepted': FriendRequestAccepted,
		'Dummy': Dummy,
	},
}
</script>
