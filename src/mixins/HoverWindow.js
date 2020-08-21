export default {
  data() {
    return {
      mouseover: false,
      timeout: null
    }
  },
	methods: {
    toggle_window(window_name, callback = false) {
      if(!this.show) {
        this.$store.dispatch('show_window', window_name)
        this.close_window()
        // run callback after shown
        if(callback) {
          callback()
        }
      } else {
        this.$store.dispatch('hide_window', window_name)
      }
    },
    close_window(window_name) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        if(!this.mouseover) {
          this.$store.dispatch('hide_window', window_name)
        }
      }, 2000)
    },
    mouse_leaves_window(window_name) {
      if(this.show) {
        this.mouseover = !this.mouseover
        this.close_window(window_name)
      }
    }
	}
}