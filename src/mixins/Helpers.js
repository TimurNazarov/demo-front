// other mixins
import Pusher from './Pusher'

export default {
	methods: {
    set_user(user) {
      // set user in storage
      this.$store.dispatch('set_user', user)
      // init pusher
      this.init_pusher(user)
    },
    pluck(array, key) {
      return array.map(o => o[key]);
    },
    pluck_nested_messages(days_object, key) {
      var ids = []
      Object.keys(days_object).forEach(day => {
        ids = [...ids, ...this.pluck(days_object[day], key)]
      })
      return ids
    },
    cut_string(string, max_characters) {
      if(string.length > max_characters) {
        let sliced = string.slice(0, max_characters - 3)
        let trimmed = sliced.trim()
        return trimmed + '...'
      } else {
        return string
      }
      
    }
  },
  mixins: [Pusher]
}