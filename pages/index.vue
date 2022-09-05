<template>
	<div id="app">
		<div class="container">
			<TweetList />
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
	name: 'IndexPage',
});
</script>

<style>
html,
body {
	height: 100%;
}

body {
	background: repeating-linear-gradient(30deg, white, white 10px, #f7f7f7 10px, #f7f7f7 20px);
	min-height: 100vh;
}
</style>

<style scoped lang="scss">
#app {
	padding-top: 24px;
	padding-bottom: 48px;
}
</style>
