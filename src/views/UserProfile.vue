<template>
	<div class="user-profile-page" v-if="logged_user.loaded && user">
		<div class="user-profile-header">
			<div class="container">
				<div class="user-profile-header-content">
					<img class="user-profile-header-picture" :src="user.profile_picture_average" :alt="user.name">
					<div class="user-profile-header-info">
						<user-actions-panel v-if="logged_user.id != user.id" :user="friend"/>
						<p class="user-profile-header-name">{{ user.name }}</p>
					</div>
				</div>
			</div>
		</div>
		<div class="user-profile">
			<div class="container">
				<div class="user-profile-content">
					<div class="user-profile-friends">
						<p class="user-profile-section-title">{{ $ml.get('profile.friends') }}</p>
						<user-list v-if="user.friends.length > 0" :users="user.friends" />
							<p v-else>{{ $ml.get('profile.no_friends') }}</p>
					</div>
					<div class="user-profile-posts">
						<p class="user-profile-section-title">{{ $ml.get('profile.posts') }}</p>
						<div v-if="logged_user.id == user.id" class="user-profile-post-form">
							<form @submit.prevent="!submit_blocked ? submit() : false">
								<demo-input v-model="form.title.value" 
								:label="$ml.get('profile.form.title')" 
								field="title" 
								:display_errors="display_errors" 
								@valid="form.title.valid = $event"/>
								<demo-input v-model="form.content.value" 
								:label="$ml.get('profile.form.content')" 
								field="content" type="textarea"  
								:display_errors="display_errors" 
								@valid="form.content.valid = $event"/>
								<p></p>
								<demo-submit :submit_blocked="submit_blocked" :button_text="$ml.get('form.button.post')" @submitted="submit"/>
								<p v-if="backend_error" class="error-message">{{ backend_error }}</p>
							</form>
						</div>
						<div class="posts-output">
							<ul v-if="user.posts.length > 0">
								<post-card v-for="post in user.posts" :key="post._id" :post="post"/>
							</ul>
							<p v-else>{{ $ml.get('profile.no_posts') }}</p>
						</div>
						<div v-if="show_load_more" class="btn btn-default load-more" @click="!load_more_blocked ? load_more_posts() : false">
							<demo-loader :show="load_more_blocked" :size="30"/>
							<span v-if="!load_more_blocked">{{ $ml.get('form.button.load_more') }}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
// static
import static_data from '@/static/static.json'
// modules
import Loader from '@/components/modules/loader/Loader'
// layouts
import UserList from '@/components/layouts/UserList'
import UserActionsPanel from '@/components/layouts/UserActionsPanel'
import PostCard from '@/components/layouts/PostCard'
// mixins
import Form from '@/mixins/Form'

export default {
	name: 'UserProfile',
	beforeCreate() {
		this.$store.dispatch('show_window', 'loader')
	},
	created() {
		let user_id = this.$route.params.id
		let body = {
			user_id: user_id
		}
		this.axios.post(static_data.backend_api_url + "/user/profile", body)
			.then(res => {
				var user = res.data.data
				if(document.title != user.name) {
					document.title = user.name
				}
				this.user = user
				this.$store.dispatch('hide_window', 'loader')
			})
			.catch(err => {
				if(err.response.status == 404) {
					this.$router.push('/404')
				}
			})
	},
	data() {
		return {
			user: null,
			posts_page: 2,
			no_more_posts: false,
			form: {
				title: {
					value: '',
					valid: false
				},
				content: {
					value: '',
					valid: false
				}
			},
			load_more_blocked: false
		}
	},
	methods: {
		submit() {
			this.display_errors = true
			this.backend_error = false
			if(!this.are_form_fields_valid(this.form.title, this.form.content)) return
			this.submit_blocked = true
			let body = {
				title: this.form.title.value,
				content: this.form.content.value
			}
			this.axios.post(static_data.backend_api_url + '/post/add', body)
				.then(res => {
					if(res.data.demo_error) {
						this.backend_error = this.$ml.get('demo_errors.' + res.data.demo_error)
					} else {
						this.form.title.value = ''
						this.form.content.value = ''
						this.user.posts.unshift(res.data)
					}
					this.display_errors = false
					this.submit_blocked = false
				})
		},
		load_more_posts() {
			this.load_more_blocked = true
			let body = {
				page: this.posts_page,
				user_id: this.user.id
			}
			this.axios.post(static_data.backend_api_url + "/user-posts", body)
				.then(res => {
					if(res.data.length == 0) {
						this.no_more_posts = true
					} else {
						this.user.posts = [...this.user.posts, ...res.data]
						this.posts_page++
					}
					this.load_more_blocked = false
				})
		}
	},
	computed: {
		logged_user() {
			return this.$store.getters.user
		},
		show_load_more() {
			return this.user.posts.length > 0 && !this.no_more_posts
		},
		friend() {
			let friend = this.$store.getters.is_friend(this.user.id)
			return friend ? friend : this.user
		}
	},
	components: {
		'user-list': UserList,
		'post-card': PostCard,
		'demo-loader': Loader,
		'user-actions-panel': UserActionsPanel
	},
	mixins: [Form]
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/user-profile.scss';
</style>