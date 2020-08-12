import Echo from 'laravel-echo'

export default {
	methods: {
    init_pusher(user) {
      window.Pusher = require('pusher-js')
      window.Echo = new Echo({
          authEndpoint : this.$store.getters.api_url + '/broadcasting/auth',
          broadcaster: 'pusher',
          key: 'dde4cdad59f1d0755fff',
          cluster: 'eu',
          forceTLS: true,
          auth: {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                Accept: 'applocation/json'
            },
          },
      })
      this.set_listeners(user)
      this.$store.dispatch('init_pusher')
    },
    set_listeners(user) {
      window.Echo.private('user.' + user.id)
        .listen('NewPrivateMessage', (e) => {
          var data = {
            contact_id: e.message.from,
            message: e.message
          }
          // mark as read if you received a message from active contact
          var active_contact = this.$store.getters.active_contact
          if(e.message.from == active_contact.id) {
            data.nullify = true
            e.message.seen = 1
            let body = {
              contact_id: active_contact.id,
              new: true
            }
            this.axios.post(this.$store.getters.api_url+"/messages/mark-as-read", body)
          }
          this.$store.dispatch('add_new_message', data)
        })
        .listen('MessageRead', (e) => {
          this.$store.dispatch('mark_as_read', e.info)
        })
        .listen('NewFriendRequest', (e) => {
          this.$store.dispatch('add_incoming_friend_request', e.request)
        })
        .listen('FriendRequestCancelled', (e) => {
          this.$store.dispatch('remove_incoming_friend_request', e.request.from)
        })
        .listen('FriendRequestAccepted', (e) => {
          // laravel backend resource fix
          this.$set(e.request.to, 'last_private_message',  e.request.from.last_private_message)
          this.$store.dispatch('outgoing_friend_request_accepted', e.request.to)
        })
        .listen('FriendRequestDeclined', (e) => {
          this.$store.dispatch('cancel_friend_request', e.request)
        })
        .listen('FriendRemoved', (e) => {
          this.$store.dispatch('remove_friend', e.removing_friend)
          // clear active contact if..
        })
        // .listen('eventname', (e) => {})
        .notification(n => {
          // console.log(n)
          // switch(notification.type) {
          //   case "App\\Notifications\\NewAppointment": this.new_appointment(notification.appointment, notification.notification_data); break
          //   // case 123: this.new_appointment(notification.appointment); break
          // }
        })
        // whispering
        window.Echo.private('type-to.' + user.id)
        .listenForWhisper('typing', (e) => {
          this.$store.dispatch('contact_is_typing', e.id)
        })
    }
  }
}