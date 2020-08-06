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
          // console.log(e)
          this.$store.dispatch('add_new_message', e.message)
        })
        .listen('NewFriendRequest', (e) => {
          this.$store.dispatch('add_incoming_friend_request', e.request)
        })
        .listen('FriendRequestCancelled', (e) => {
          this.$store.dispatch('remove_incoming_friend_request', e.request.from)
        })
        .listen('FriendRequestAccepted', (e) => {
          this.$store.dispatch('incoming_friend_request_accepted', e.request)
        })
        .listen('FriendRequestDeclined', (e) => {
          this.$store.dispatch('cancel_friend_request', e.request)
        })
        .listen('FriendRemoved', (e) => {
          console.log(e)
          this.$store.dispatch('remove_friend', e.removing_friend)
        })
        // .listen('eventname', (e) => {})
        .notification(n => {
          // console.log(n)
          // switch(notification.type) {
          //   case "App\\Notifications\\NewAppointment": this.new_appointment(notification.appointment, notification.notification_data); break
          //   // case 123: this.new_appointment(notification.appointment); break
          // }
        })
    },
    // handlers
    new_appointment(appointment, notification) {
      // push appointment
      console.log(appointment);
      this.$store.dispatch('add_pushed_appointment', appointment)
      this.$store.dispatch('add_pushed_notification', notification)
    }
  }
}