import Vue from 'vue'

export default {
  set_user(state, user) {
  	state.user = user
  	state.user.loaded = true
  },
  init_pusher(state) {
  	state.pusher_initizlized = true
  },
  //friendable users
  set_friendable_users(state, users) {
    state.friendable_users.loaded = users
  },
  add_friendable_user(state, user) {
    state.friendable_users.new.push(user)
  },
  clear_friendable_user(state, user) {
    let loaded_users = state.friendable_users.loaded
    let new_users = state.friendable_users.new
    let loaded_user = loaded_users.findIndex(f => f.id == user.id)
    if(loaded_user >= 0) {
      loaded_users.splice(loaded_user, 1)
    } else {
      let new_user = state.friendable_users.new.findIndex(f => f.id == user.id)
      new_users.splice(new_user, 1)
    }
  },
  // friend requests
  add_outgoing_friend_request(state, request) {
    state.user.friend_requests.outgoing.push(request)
  },
  remove_outgoing_friend_request(state, to_user) {
    let outgoing_requests = state.user.friend_requests.outgoing
    let index = outgoing_requests.findIndex(r => r.to.id == to_user.id)
    outgoing_requests.splice(index, 1)
  },
  add_incoming_friend_request(state, request) {
    state.user.friend_requests.incoming.new.push(request)
  },
  remove_incoming_friend_request(state, from_user) {
    let loaded_incoming_requests = state.user.friend_requests.incoming.loaded
    let new_incoming_requests = state.user.friend_requests.incoming.new
    let loaded_incoming_request = loaded_incoming_requests.findIndex(r => r.from.id == from_user.id)
    if(loaded_incoming_request >= 0) {
      loaded_incoming_requests.splice(loaded_incoming_request, 1)
    } else {
      let new_incoming_request = new_incoming_requests.findIndex(r => r.from.id == from_user.id)
      new_incoming_requests.splice(new_incoming_request, 1)
    }
  },
  // friends
  add_friend(state, friend) {
    state.user.friends.new.push(friend)
  },
  remove_friend(state, friend) {
    let loaded_friends = state.user.friends.loaded
    let new_friends = state.user.friends.new
    let loaded_friend = loaded_friends.findIndex(f => f.id == friend.id)
    if(loaded_friend >= 0) {
      loaded_friends.splice(loaded_friend, 1)
    } else {
      let new_friend = new_friends.findIndex(f => f.id == friend.id)
      new_friends.splice(new_friend, 1)
    }
    // 
    if(state.messaging.active_contact && state.messaging.active_contact.id == friend.id) {
      state.messaging.active_contact = false
      // maybe remove messages as well
    }
  },
  // messaging
  update_active_contact(state, contact) {
    state.messaging.active_contact = contact
  },
  set_contact_messages(state, data) {
    if(!state.messaging.messages[data.contact_id]) {
      Vue.set(state.messaging.messages, data.contact_id, {})
      Vue.set(state.messaging.messages[data.contact_id], 'loaded' , {})
      Vue.set(state.messaging.messages[data.contact_id], 'new', {})
    }
    state.messaging.messages[data.contact_id].loaded = data.messages
  },
  prepend_contact_messages(state, data) {
    Object.keys(data.messages).reverse().forEach(day => {
      // day already exists(loaded)
      if(state.messaging.messages[data.contact_id].loaded[day]) {
        state.messaging.messages[data.contact_id].loaded[day] = [...data.messages[day], ...state.messaging.messages[data.contact_id].loaded[day]]
      } else {
        let new_day = {
          [day]: data.messages[day]
        }
        state.messaging.messages[data.contact_id].loaded = {...new_day, ...state.messaging.messages[data.contact_id].loaded}
      }
    })
  },
  add_new_message(state, data) {
    // stop typing
    let loaded_contacts = state.user.friends.loaded
    let new_contacts = state.user.friends.new
    let loaded_contact = loaded_contacts.findIndex(c => c.id == data.contact_id)
    if(loaded_contact >= 0) {
      var contact = loaded_contacts[loaded_contact]
    } else {
      let new_contact = new_contacts.findIndex(c => c.id == data.contact_id)
      var contact = new_contacts[new_contact]
    }
    contact.typing = false
    // add message
    if(!state.messaging.messages[data.contact_id]) {
      Vue.set(state.messaging.messages, data.contact_id, {})
      Vue.set(state.messaging.messages[data.contact_id], 'loaded' , {})
      Vue.set(state.messaging.messages[data.contact_id], 'new', {})
    }
    if(!state.messaging.messages[data.contact_id].new[data.message.date]) {
      Vue.set(state.messaging.messages[data.contact_id].new, data.message.date, [])
    }
    state.messaging.messages[data.contact_id].new[data.message.date].push(data.message)
  },
  update_unread(state, data) {
    // update unread count
    let loaded_contacts = state.user.friends.loaded
    let new_contacts = state.user.friends.new
    let loaded_contact = loaded_contacts.findIndex(c => c.id == data.contact_id)
    if(loaded_contact >= 0) {
      var contact = loaded_contacts[loaded_contact]
    } else {
      let new_contact = new_contacts.findIndex(c => c.id == data.contact_id)
      var contact = new_contacts[new_contact]
    }

    if(data.nullify) {
      contact.unread_count = 0
    } else {
      if(data.message.from != state.user.id) {
        contact.unread_count++
      }
    }
  },
  update_last_message(state, data) {
    let loaded_contacts = state.user.friends.loaded
    let new_contacts = state.user.friends.new
    let loaded_contact = loaded_contacts.findIndex(c => c.id == data.contact_id)
    if(loaded_contact >= 0) {
      loaded_contacts[loaded_contact].last_private_message = data.message
    } else {
      let new_contact = new_contacts.findIndex(c => c.id == data.contact_id)
      new_contacts[new_contact].last_private_message = data.message
    }
  },
  contact_is_typing(state, id) {
    let loaded_contacts = state.user.friends.loaded
    let new_contacts = state.user.friends.new
    let loaded_contact = loaded_contacts.findIndex(c => c.id == id)
    if(loaded_contact >= 0) {
      var contact = loaded_contacts[loaded_contact]
    } else {
      let new_contact = new_contacts.findIndex(c => c.id == id)
      var contact = new_contacts[new_contact]
    }
    // trigger typing
    contact.typing = true
    if(contact.typing_timeout != null) {
      clearTimeout(contact.typing_timeout)
    }
    contact.typing_timeout = setTimeout(() => {
      contact.typing = false
    }, 2000)
  },
  contact_is_selected(state, contact) {
    contact.initial_select = false
  },
  mark_as_read(state, info) {
    if(!state.messaging.messages[info.from]) {
      // contact not loaded
      return
    }
    // if messages already loaded check only new(skip loaded)
    if(!info.new) {
      var loaded_messages = state.messaging.messages[info.from].loaded
      Object.keys(loaded_messages).forEach(day => {
        loaded_messages[day].forEach(message => {
          if(message.from == state.user.id && message.seen == 0) {
            message.seen = 1
          }
        })
      })
    }
    var new_messages = state.messaging.messages[info.from].new
    Object.keys(new_messages).forEach(day => {
      new_messages[day].forEach(message => {
        if(message.from == state.user.id && message.seen == 0) {
          message.seen = 1
        }
      })
    })
  },
  // etc
  show_message_popup(state, message) {
    state.message_popup.message = message
    state.message_popup.show = true
    setTimeout(() => {
      state.message_popup.show = false
    }, 2000)
  },
  // show
  show_window(state, window_name) {
  	state.show[window_name] = true
  },
  hide_window(state, window_name) {
  	state.show[window_name] = false
  },
  toggle_window(state, window_name) {
  	state.show[window_name] = state.show[window_name] ? false : true
  }
}