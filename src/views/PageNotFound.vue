<template>
	<div class="not-found-page">
		<!-- <i class="not-found-icon fas fa-ghost"></i> -->
		<p class="not-found-404">404</p>
		<p class="not-found-message">{{ $ml.get('pages.page_not_found') }}</p>
		<p class="not-found-redirect">{{ $ml.get('messages.404.redirect') }} {{ redirect_counter }}</p>
	</div>
</template>

<script>
export default {
	name: 'PageNotFound',
	beforeDestroy() {
		clearInterval(this.redirect_inerval)
	},
	data() {
		return {
			redirect_counter: 5,
			redirect_inerval: null
		}
	},
	mounted() {
		this.$store.dispatch('hide_window', 'loader')
		this.redirect_inerval = setInterval(() => {
			if(this.redirect_counter == 0) {
				clearInterval(this.redirect_inerval)
				this.$router.push('/')
			} else {
				this.redirect_counter--
			}
		}, 1000)
	}
}
</script>
