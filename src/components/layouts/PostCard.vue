<template>
  <li class="post-card">
    <div class="post-card-user">
      <img class="post-card-user-picture" :src="user_picture_path" @click="navigate_to_profile">
      <div class="post-card-info">
        <p class="post-card-user-name" @click="navigate_to_profile">{{ post._source.user.name }}</p>
        <div class="post-card-post-date">{{ format_date(post._source.created_at, true) }}</div>
        <div class="post-card-post-title">{{ post._source.title }}</div>
      </div>
    </div>
    <div class="post-card-content">
      <div class="post-card-post-content">{{ post._source.content }}</div>
    </div>
  </li>
</template>

<script>
// static
import static_data from '@/static/static.json'
// mixins
import Helpers from '@/mixins/Helpers'

export default {
  name: 'UserCard',
  methods: {
    navigate_to_profile() {
      document.title = this.post._source.user.name
      this.$router.push('/profile/' + this.post._source.user.id)
    }
  },
  computed: {
    user_picture_path() {
      var picture_name = this.post._source.user.profile_picture_path
      if(picture_name == null) {
        return this.profile_picture_url(picture_name)
      } else {
        return static_data.backend_url + '/uploads/profile/' + picture_name + '-small.jpg'
      }
    }
  },
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  mixins: [Helpers]
}
</script>
