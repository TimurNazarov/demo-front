export default {
	friendable_users(state) {
		return state.friendable_users
	},
	friendable_set(state) {
		return state.friendable_set
	},
	user(state) {
		return state.user
	},
	pusher_initizlized(state) {
		return state.pusher_initizlized
	},
	// messaging
	active_contact(state) {
		return state.messaging.active_contact
	},
	chat_total_unread(state) {
		var count = 0
		state.user.friends.loaded.forEach(c => {
			count += c.unread_count
		})
		state.user.friends.new.forEach(c => {
			count += c.unread_count
		})
		return count
	},
	contact_messages: state => contact => {
		return state.messaging.messages[contact.id]
	},
	active_contact_messages(state) {
		return state.messaging.messages[state.messaging.active_contact.id]
	},
	// etc
	message_popup(state) {
		return state.message_popup
	},
	is_friend: state => user_id => {
		let loaded_friends = state.user.friends.loaded
		let new_friends = state.user.friends.new
		let loaded_friend = loaded_friends.find(f => f.id == user_id)
		let new_friend = new_friends.find(f => f.id == user_id)
		if(loaded_friend) {
			return loaded_friend
		} else if(new_friend) {
			return new_friend
		}
		return false
	},
	// show
	show(state) {
		return state.show
	}
}