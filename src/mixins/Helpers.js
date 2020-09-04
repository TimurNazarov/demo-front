// other mixins
import Pusher from './Pusher'
// packages
import moment from 'moment'

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
    },
    profile_picture_url(url) {
      return url == null ? require('@/assets/images/default-profile-picture.jpg') : url
    },
    format_date(date, timestamp = false) {
      var moment_utc =  moment.utc()
      if(timestamp) {
        date = moment.unix(date).utc()
      } else {
        date = moment.utc(date, 'DD-MM-yy')
      }
      // is today
      if(moment_utc.isSame(date, 'day')) {
        return this.$ml.get('messaging.date.today')
        // is yesterday
      } else if(moment_utc.subtract(1, 'days').isSame(date, 'day')) {
        return this.$ml.get('messaging.date.yesterday')
        // is current year
      } else if(moment_utc.isSame(date, 'year')) {
        return date.format('D') + ' ' + this.$ml.get('messaging.date.' + (date.month() + 1))
        // else return full date
      } else {
        return date.format('D') + ' ' + this.$ml.get('messaging.date.' + (date.month() + 1)) + ' ' + date.year()
      }
    },
  },
  mixins: [Pusher]
}