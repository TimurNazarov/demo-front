// other mixins
import Pusher from './Pusher'

export default {
	methods: {
    set_user(user) {
      // set user in storage
      this.$store.dispatch('set_user', user)
      // init pusher
      this.init_pusher(user)
    }
  },
  mixins: [Pusher]
}