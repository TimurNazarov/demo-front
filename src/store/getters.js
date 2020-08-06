export default {
  api_url(state) {
  	return state.backend_api_url
  },
  friendable_users(state) {
    return state.friendable_users.loaded.concat(state.friendable_users.new)
  },
  user_set(state) {
    return state.user ? true : false
  },
  user(state) {
  	return state.user
  },
  pusher_initizlized(state) {
    return state.pusher_initizlized
  },
  // messaging
  contacts(state) {
    return state.messaging.contacts.loaded.concat(state.messaging.contacts.new)
  },
  active_contact(state) {
    return state.messaging.active_contact
  },
  active_contact_messages(state) {
    return state.messaging.messages[state.messaging.active_contact.id]
  },
  // etc
  message_popup(state) {
    return state.message_popup
  },
  // modals
  modals(state) {
    return state.modals
  }
}