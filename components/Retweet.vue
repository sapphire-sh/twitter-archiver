<template>
	<Tweet :tweet="tweet.retweeted_status" />
</template>

<script setup lang="ts">
import { Tweet as TweetModel } from '../models';

interface Props {
	tweet: TweetModel;
}

const props = defineProps<Props>();
</script>

<script lang="ts">
export default {
	name: 'Retweet',
};
</script>
