export default {
  set_user(context, user) {
    context.commit('set_user', user)
    context.commit('hide_window', 'loader');
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
  outgoing_friend_request_accepted(context, accepted_by) {
    context.commit('add_friend', accepted_by)
    context.commit('remove_outgoing_friend_request', accepted_by)
  },
  remove_friend(context, friend) {
    context.commit('remove_friend', friend)
    context.commit('add_friendable_user', friend)
  },
  decline_friend_request(context, from_user) {
    context.commit('remove_incoming_friend_request', from_user)
    context.commit('add_friendable_user', from_user)
  },
  remove_incoming_friend_request(context, from_user) {
    context.commit('remove_incoming_friend_request', from_user)
    context.commit('add_friendable_user', from_user)
  },
  // messaging
  update_active_contact(context, contact) {
    context.commit('update_active_contact', contact)
    // unread to null
    let data = {
      contact_id: contact.id,
      nullify: true
    }
    context.commit('update_unread', data)
  },
  set_contact_messages(context, data) {
    context.commit('set_contact_messages', data)
  },
  load_contact_messages(context, data) {
    context.commit('prepend_contact_messages', data)
  },
  update_unread(context, data) {
    context.commit('update_unread', data)
  },
  add_new_message(context, data) {
    context.commit('add_new_message', data)
    context.commit('update_unread', data)
    context.commit('update_last_message', data)
  },
  contact_is_typing(context, id) {
    context.commit('contact_is_typing', id)
  },
  contact_is_selected(context, contact) {
    context.commit('contact_is_selected', contact)
  },
  mark_as_read(context, info) {
    context.commit('mark_as_read', info)
  },
  // notifications
  add_notification(context, notification) {
    context.commit('add_notification', notification)
  },
  // etc
  show_message_popup(context, message) {
    context.commit('show_message_popup', message)
  },
  // show 
  show_window(context, window_name) {
    context.commit('show_window', window_name)
  },
  hide_window(context, window_name) {
    context.commit('hide_window', window_name)
  },
  toggle_window(context, window_name) {
    context.commit('toggle_window', window_name)
  }
}