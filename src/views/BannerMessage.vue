<template>
	<div class="banner-message-page">
		<div class="container">
			<div :class="['banner-message', 'banner-' + $route.params.banner_type]">
				<div class="banner-message-icon">
					<i class="far fa-info-circle"></i>
				</div>
				<div class="banner-message-content">{{ $ml.get('messages.banners.' + $route.params.message_type + '_' + $route.params.banner_type) }}</div>
			</div>
		</div>
	</div>
</template>

<script>

export default {
	name: 'BannerMessage',
	data() {
		return {

		}	
	}
}
</script>
