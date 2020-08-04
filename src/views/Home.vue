<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <button @click="test">test</button>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  methods: {
  	test() {
  		let dummy_json_url = 'http://jsonplaceholder.typicode.com'
  		this.axios.get(dummy_json_url + '/posts')
  			.then(res => {
  				console.log(res)
  			})
  	}
  }
}
</script>
