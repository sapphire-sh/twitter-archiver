<template>
	<div>
		<div v-html="text" />
		<div class="btn-group">
			<div class="btn">
				{{ tweet.retweet_count }}
			</div>
			<div class="btn">
				{{ tweet.favorite_count }}
			</div>
			<div class="btn">
				{{ tweet.retweet_count }}
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Tweet } from '../models';
import { sanitizeText } from '../utils';

interface Props {
	tweet: Tweet;
}

const props = defineProps<Props>();
</script>

<script lang="ts">
export default {
	name: 'Tweet',
	data() {
		return {
			text: sanitizeText(this.$props.tweet),
		};
	},
};
</script>
