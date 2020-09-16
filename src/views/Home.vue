<template>
	<div class="home-page">
		<div class="container">
			<p class="welcoming-message">{{ $ml.get('home.welcoming.welcome_text') }}</p>
			<ul>
				<li v-for="link in $ml.get('home.welcoming.links')" :key="link"><a :href="link" target="_blank">{{ link }}</a></li>
			</ul>
			<p>{{ $ml.get('home.welcoming.contacts.text') }}</p>
			<p>
				<span>{{ $ml.get('home.welcoming.contacts.telegram.text') }}: </span> 
				<a :href="$ml.get('home.welcoming.contacts.telegram.link')" target="_blank">{{  $ml.get('home.welcoming.contacts.telegram.link_text') }}</a>
			</p>
			<p>
				<span>{{ $ml.get('home.welcoming.contacts.email.text') }}: </span>
				<a :href="'mailto:' + $ml.get('home.welcoming.contacts.email.value')" target="_blank">{{  $ml.get('home.welcoming.contacts.email.value') }}</a>
			</p>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Home'
}
</script>

<style lang="scss">
@import '@/assets/styles/pages/home.scss';
</style>