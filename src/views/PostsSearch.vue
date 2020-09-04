<template>
	<div class="posts-search-page" v-if="logged_user.loaded">
		<div class="posts-search-page-content">
			<p>{{ $ml.get('search.search_label') }}</p>
			<form class="posts-search-form" @submit.prevent="submit">
				<demo-input field="title" v-model="form.query.value" :display_errors="display_errors" @valid="form.query.valid = $event"/>
				<demo-submit 
				:submit_blocked="submit_blocked" 
				:button_text="$ml.get('form.button.search')" 
				button_type="orange"
				@submitted="load_posts"/>
				<p v-if="backend_error" class="error-message">{{ backend_error }}</p>
			</form>
			<div class="posts-output">
        <demo-loader :show="posts_loader" :background="'#fff'" :z_index="996"/>
        <p v-if="posts.length <= 0 && no_posts_found">{{ $ml.get('search.no_posts_found') }}</p>
				<ul>
					<post-card v-for="post in posts" :key="post._id" :post="post"/>
				</ul>
			</div>
			<div v-if="show_load_more" class="btn btn-default load-more" @click="!load_more_blocked ? load_posts(true) : false">
				<demo-loader :show="load_more_blocked" :size="30"/>
				<span v-if="!load_more_blocked">{{ $ml.get('form.button.load_more') }}</span>
			</div>
		</div>
	</div>
</template>

<script>
// modules
import Loader from '@/components/modules/loader/Loader'
// layouts
import PostCard from '@/components/layouts/PostCard'
// mixins
import Form from '@/mixins/Form'

export default {
	name: 'PostsSearch',
	data() {
		return {
			posts: [],
			posts_loader: false,
			no_more_posts: false,
			no_posts_found: false,
			page: 1,
			fixed_query_value: false,
			form: {
				query: {
					value: '',
					valid: false
				}
			},
			load_more_blocked: false
		}
	},
	methods: {
		load_posts(load_more = false) {
			var search_query = this.form.query.value
			if(load_more) {
				this.load_more_blocked = true
				search_query = this.fixed_query_value
			} else {
				//
				this.display_errors = true
				this.backend_error = false
				if(!this.are_form_fields_valid(this.form.query)) return
				this.submit_blocked = true
				//
				// posts loader
				this.posts_loader = true
				// reset no more posts
				this.no_more_posts = false
				// reset no posts found
				this.no_posts_found = false
				// reset load more button
				this.load_more_blocked = false
				// reset page
				this.page = 1
				// set query for load more request
				this.fixed_query_value = this.form.query.value
			}
			let body = {
				page: this.page,
				q: search_query
			}
			this.axios.post(this.$store.getters.api_url + '/posts/search', body)
				.then(res => {
					if(res.data.demo_error) {
						this.backend_error = this.$ml.get('demo_errors.' + res.data.demo_error)
					} else {
						// set posts
						this.page++
						if(res.data.hits.hits.length == 0) {
							this.no_more_posts = true
							this.no_posts_found = true
						}
						if(load_more) {
							this.posts = [...this.posts, ...res.data.hits.hits]
							this.load_more_blocked = false
						} else {
							this.posts = res.data.hits.hits
						}
					}
					this.posts_loader = false
					this.display_errors = false
					this.submit_blocked = false
				})
				.catch(err => console.log(err.response))
		}
	},
	computed: {
		logged_user() {
			return this.$store.getters.user
		},
		show_load_more() {
			return this.posts.length > 0 && !this.no_more_posts
		}
	},
	components: {
		'post-card': PostCard,
		'demo-loader': Loader
	},
	mixins: [Form]
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/posts-search.scss';
</style>