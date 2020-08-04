export default {
  api_url(state, additional_properties) {
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
  // etc
  message_popup(state) {
    return state.message_popup
  },
  // modals
  modals(state) {
    return state.modals
  }
}