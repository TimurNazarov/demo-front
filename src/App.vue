<template>
	<div id="app">
		<demo-loader :show="loader" :background="'#fff'"/>
		<transition name="openup">
			<div class="message-popup" v-if="message_popup.show">{{ message_popup.message }}</div>
		</transition>
		<chat-module/>
		<div class="app-content">
			<header-component/>
			<div class="app-dynamic-section">
				<router-view :key="$route.fullPath"/>
			</div>
		</div>
	</div>
</template>

<script>
// packages
import router from './router'
// --
// components
import Header from './components/header/Header'
// modules
import ChatModule from './components/modules/chat/Chat'
import Loader from './components/modules/loader/Loader'
// mixins
import Helpers from './mixins/Helpers'

export default {
	beforeCreate() {
		router.beforeResolve((to, from, next) => {
			let title = to.meta.ml_path ? this.$ml.get('pages.' + to.meta.ml_path) : false
			if(title) {
				document.title = title
			}
			next()
		})
	},
	created() {
		let logged = localStorage.getItem('access_token')
		if(logged) {
			// -- load user
			this.$store.state.user_info_initialized = this.axios.get(this.$store.getters.api_url+"/user/get")
			.then(res => {
				this.set_user(res.data.data)
			})
		}
	},
	mounted() {
		let logged = localStorage.getItem('access_token')
		if(logged) {
			this.$store.state.user_info_initialized.then(() => {
				// this.$store.dispatch('hide_window', 'loader')
			})
		} else {
			this.$store.dispatch('hide_window', 'loader')
		}
	},
	computed: {
		message_popup() {
			return this.$store.getters.message_popup
		},
		loader() {
			return this.$store.getters.show.loader
		}
	},
	components: {
		'header-component': Header,
		'chat-module': ChatModule,
		'demo-loader': Loader
	},
	mixins: [Helpers]
}
</script>

<style lang="scss">
@import 'assets/styles/main.scss';
</style>
