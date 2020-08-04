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
    console.log(loaded_user)
    if(loaded_user) {
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
    console.log(from_user)
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
  },
  // etc
  show_message_popup(state, message) {
    state.message_popup.message = message
    state.message_popup.show = true
    setTimeout(() => {
      state.message_popup.show = false
    }, 2000)
  },
  // modals
  open_modal(state, modal) {
  	state.modals[modal] = true
  },
  close_modal(state, modal) {
  	state.modals[modal] = false
  },
  toggle_modal(state, modal) {
  	state.modals[modal] = state.modals[modal] ? false : true
  }
}