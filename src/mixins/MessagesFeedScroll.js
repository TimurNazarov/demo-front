export default {
  mounted() {
    this.messages_window = this.$refs.messages_window
    // bottom
    this.scroll_to(this.messages_window.scrollHeight)
    this.$root.$on('chat_module_message_sent', () => {
      this.new_message_sent = true
    })
    this.messages_window.addEventListener('scroll', () => {
      // if within 50 px from top and request wasn't sent yet
      if(this.messages_window.scrollTop <= 50 && !this.new_page_loading) {
        this.window_scroll_from_bottom = this.messages_window.scrollHeight - this.messages_window.scrollTop

        this.new_page_loading = true
        this.new_page_loading_update = true
        // load messages
        this.paginate()
      }
    })
    /// observe date intersection

    this.observer = new IntersectionObserver(this.observer_callback, {
      root: this.messages_window,
      threshold: 0,
      rootMargin: '-200px'
    });

    document.querySelectorAll(".chat-module-messages-feed-output").forEach(el => this.observer.observe(el));
  },
  updated() {
    // when loaded and updated dom measure scroll to maintain position
    if(this.new_page_loading_update) {
      this.new_page_loading_update = false
      this.scroll_to(this.messages_window.scrollHeight - this.window_scroll_from_bottom - 50)
      // else scroll to bottom scenario
    } else {
      // if didn't scrolled too far above (when update is triggered) or sending outgoing message - scroll to bottom
      if((this.messages_window.scrollHeight - this.messages_window.offsetHeight) - this.messages_window.scrollTop < 200 || this.new_message_sent) {
        // scroll to bottom
        this.new_message_sent = false
        this.scroll_to(this.messages_window.scrollHeight)
      }
    }
    // re-observe dates
    document.querySelectorAll(".chat-module-messages-feed-output").forEach(el => this.observer.observe(el));
  },
  data() {
    return {
      z: 1000,
      observer: null,
      window_scroll_from_bottom: null,
      messages_window: null,
      new_page_loading: false,
      new_page_loading_update: false,
      new_message_sent: false
    }
  },
	methods: {
    scroll_to(px) {
      this.messages_window.scrollTop = px
    },
    observer_callback(entries) {
      entries.forEach(({ target, isIntersecting } ) => {
        if (!isIntersecting) {
          return target.classList.remove('in-sight');
        }
        
        target.classList.add('in-sight');
      })
    }
  },
  watch: {
    active_contact() {
      this.$nextTick(function () {
        // bottom
        this.scroll_to(this.messages_window.scrollHeight)
      })
    }
  },
}