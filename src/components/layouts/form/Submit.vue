<template>
	<div :class="classes" @click="!submit_blocked ? $emit('submitted') : false">
		<demo-loader :show="submit_blocked" :size="30"/>
		<input v-if="!submit_blocked" type="submit" :value="button_text">
	</div>
</template>

<script>
// modules
import Loader from '@/components/modules/loader/Loader'

export default {
	name: 'Submit',
	components: {
		'demo-loader': Loader
	},
	computed: {
		classes() {
			let classes = ['form-submit', 'btn']
			classes.push('btn-' + this.button_type)
			return classes
		}
	},
	props: {
		submit_blocked: {
			type: Boolean,
			default: false
		},
		button_text: {
			type: String,
			required: true
		},
		button_type: {
			type: String,
			default: 'default'
		}
	}
}
</script>
