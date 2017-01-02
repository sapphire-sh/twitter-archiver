'use strict';

export function dateToString(date) {
	const year = date.getFullYear();
	const month = `0${date.getMonth() + 1}`.substr(-2);
	const day = `0${date.getDate()}`.substr(-2);
	const hours = `0${date.getHours()}`.substr(-2);
	const minutes = `0${date.getMinutes()}`.substr(-2);
	const seconds = `0${date.getSeconds()}`.substr(-2);

	return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export function hydrateTweet(tweet) {
	tweet = JSON.parse(tweet.data);

	return {
		id_str: tweet.id_str,
		retweeted_status: tweet.retweeted_status,
		user: tweet.user,
		retweet_count: tweet.retweet_count,
		favorite_count: tweet.favorite_count,
		extended_entities: tweet.extended_entities,
		text: tweet.text,
		entities: tweet.entities,
		source: tweet.source,
		created_at: tweet.created_at
	};
};

export function filterTweet(tweet) {
	if(tweet.user.screen_name === 'sapphire_dev' && tweet.retweeted_status !== undefined) {
		return false;
	}
	return true;
}
