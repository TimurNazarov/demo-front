<template>
	<div class="home-page" v-if="user.loaded">
		123
	</div>
</template>

<script>
export default {
	name: 'Home',
	computed: {
		user() {
			return this.$store.getters.user
		}
	}
}
</script>
