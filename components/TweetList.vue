<template>
	<p v-if="$fetchState.pending">fetching tweets…</p>
	<p v-else-if="$fetchState.error">error</p>
	<div class="list-group" v-else>
		<div v-for="tweet of tweets" :key="tweet.id_str" class="list-group-item">
			<Retweet v-if="tweet.retweeted_status" :tweet="tweet" />
			<Tweet v-else :tweet="tweet" />
		</div>
	</div>
</template>

<script lang="ts">
import { sanitizeTweet } from '../utils';
import { Tweet } from '../models';

export default {
	name: 'TweetList',
	data(): { tweets: Tweet[] } {
		return {
			tweets: [],
		};
	},
	async fetch() {
		const tweets: Tweet[] = await this.$axios.$get('/api/tweets');
		this.tweets = tweets.map((x) => sanitizeTweet(x));
	},
};
</script>
