<template>
  <li class="user-card">
    <img class="profile-picture" :src="user.profile_picture_url" :alt="user.name">
    <div class="user-info">
      <p class="user-name">{{ user.name }}</p>
      <div v-if="is_friend" class="btn btn-orange user-send-message">
        <div class="btn-content">
          <i class="fas fa-envelope"></i>
          <span>{{ $ml.get('friends.send_message') }}</span>
        </div>
      </div>
      <div v-if="is_friend" class="btn btn-red remove-friend" @click="remove_friend">
        <div class="btn-content">
          <i class="fas fa-handshake-slash"></i>
          <span>{{ $ml.get('friends.remove') }}</span>
        </div>
      </div>
      <div v-if="is_incoming_request" class="friend-request">
        <div class="btn btn-green request-accept" @click="accept_request">
          <div class="btn-content">
            <i class="fas fa-check"></i>
            <span>{{ $ml.get('friends.accept') }}</span>
          </div>
        </div>
        <div class="btn btn-red request-decline" @click="decline_request">
          <div class="btn-content">
            <i class="fas fa-times"></i>
            <span>{{ $ml.get('friends.decline') }}</span>
          </div>
        </div>
      </div>
      <div v-if="is_friendable && !is_outgoing_request" class="btn btn-green add-user" @click="add_friend">
        <div class="btn-content">
          <i class="fas fa-handshake"></i>
          <span>{{ $ml.get('friends.add') }}</span>
        </div>
      </div>
      <div v-if="is_outgoing_request" class="outgoing-friend-request">
        <div class="btn-content">
          <i class="fas fa-hourglass-start"></i>
          <span>{{ $ml.get('friends.sent') }}</span>
        </div>
      </div>
      <div v-if="is_outgoing_request" class="btn btn-red request-cancel" @click="cancel_request">
        <div class="btn-content">
          <i class="fas fa-handshake-slash"></i>
          <span>{{ $ml.get('friends.cancel') }}</span>
        </div>
      </div>
    </div>
  </li>
</template>

<script>

export default {
  name: 'UserCard',
  methods: {
    add_friend() {
      let body = {
        to: this.user.id
      }
      this.axios.post(this.$store.getters.api_url+"/friends/request/send", body)
        .then(r => {
          let request_id = r.data.data.id
          let request = {
            id: request_id,
            to: this.user
          }
          this.$store.dispatch('make_friend_request', request)
          // popup message
          let message = this.$ml.with('user', this.user.name).get('messages.friends.add')
          this.$store.dispatch('show_message_popup', message)
        })
    },
    remove_friend() {
      let body = {
        friend_id: this.user.id
      }
      this.axios.post(this.$store.getters.api_url+"/friends/remove", body)
        .then(r => {
          this.$store.dispatch('remove_friend', this.user)
          // popup message
          let message = this.$ml.with('user', this.user.name).get('messages.friends.remove')
          this.$store.dispatch('show_message_popup', message)
        })
    },
    cancel_request() {
      let body = {
        to: this.user.id
      }
      this.axios.post(this.$store.getters.api_url+"/friends/request/cancel", body)
        .then(r => {
          let request = {
            id: r.data,
            to: this.user
          }
          this.$store.dispatch('cancel_friend_request', request)
          // popup message
          let message = this.$ml.with('user', this.user.name).get('messages.friends.cancel')
          this.$store.dispatch('show_message_popup', message)
        })
    },
    accept_request() {
      let body = {
        from: this.user.id
      }
      this.axios.post(this.$store.getters.api_url+"/friends/request/accept", body)
        .then(r => {
          let new_friend = r.data.data
          this.$store.dispatch('accept_incoming_friend_request', new_friend)
          // popup message
          let message = this.$ml.with('user', this.user.name).get('messages.friends.accept')
          this.$store.dispatch('show_message_popup', message)
        })
    },
    decline_request() {
      let body = {
        from: this.user.id
      }
      this.axios.post(this.$store.getters.api_url+"/friends/request/decline", body)
        .then(r => {
          this.$store.dispatch('decline_friend_request', this.user)
          // popup message
          let message = this.$ml.with('user', this.user.name).get('messages.friends.decline')
          this.$store.dispatch('show_message_popup', message)
        })
    }
  },
  computed: {
    logged_user() {
      return this.$store.getters.user
    },
    is_friendable() {
      return !this.is_friend && !this.is_incoming_request
    },
    friends() {
      return this.logged_user.friends.loaded.concat(this.logged_user.friends.new)
    },
    incoming_friend_requests() {
      return this.logged_user.friend_requests.incoming.loaded.concat(this.logged_user.friend_requests.incoming.new)
    },
    is_friend() {
      return this.friends.some(f => {
        return f.id == this.user.id
      })
    },
    is_incoming_request() {
      return this.incoming_friend_requests.some(r => {
        return r.from.id == this.user.id
      })
    },
    is_outgoing_request() {
      return this.logged_user.friend_requests.outgoing.some(r => {
        return r.to.id == this.user.id
      })
    }
  },
  props: {
    user: {
      type: Object,
      required: true
    }
  }
}
</script>
