export default {
  set_user(context, user) {
    context.commit('set_user', user)
  },
  init_pusher(context) {
    context.commit('init_pusher')
  },
  // friends
  set_friendable_users(context, users) {
    context.commit('set_friendable_users', users)
  },
  make_friend_request(context, request) {
    context.commit('add_outgoing_friend_request', request)
    context.commit('clear_friendable_user', request.to)
  },
  cancel_friend_request(context, request) {
    context.commit('remove_outgoing_friend_request', request.to)
    context.commit('add_friendable_user', request.to)
  },
  add_incoming_friend_request(context, request) {
    context.commit('add_incoming_friend_request', request)
    context.commit('clear_friendable_user', request.from)
  },
  accept_incoming_friend_request(context, friend) {
    context.commit('add_friend', friend)
    context.commit('remove_incoming_friend_request', friend)
  },
  incoming_friend_request_accepted(context, request) {
    context.commit('add_friend', request.to)
    context.commit('remove_outgoing_friend_request', request.to)
  },
  remove_friend(context, friend) {
    context.commit('remove_friend', friend)
    context.commit('add_friendable_user', friend)
  },
  decline_friend_request(context, from_user) {
    context.commit('remove_incoming_friend_request', from_user)
  },
  remove_incoming_friend_request(context, from_user) {
    context.commit('remove_incoming_friend_request', from_user)
    context.commit('add_friendable_user', from_user)
  },
  // messaging
  set_contacts(context, contacts) {
    context.commit('set_contacts', contacts)
  },
  // etc
  show_message_popup(context, message) {
    context.commit('show_message_popup', message)
  },
  // modals 
  open_modal(context, modal) {
    context.commit('open_modal', modal)
  },
  close_modal(context, modal) {
    context.commit('close_modal', modal)
  },
  toggle_modal(context, modal) {
    context.commit('toggle_modal', modal)
  },
}