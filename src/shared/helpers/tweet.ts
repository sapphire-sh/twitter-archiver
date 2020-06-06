import {
	Tweet,
} from '~/shared/models';

export function hydrateTweet(tweet: Tweet) {
	const extendedTweet = (tweet as any).extended_tweet;

	if (extendedTweet === undefined) {
		return tweet;
	}

	const {
		full_text,
	} = extendedTweet;
	extendedTweet.text = full_text;
	return extendedTweet;
}

export function hydrateEntities(tweet: Tweet) {
	const {
		entities,
		extended_entities,
	} = tweet as any;

	if (extended_entities === undefined) {
		return entities;
	}
	return {
		...entities,
		...extended_entities,
	};
}
