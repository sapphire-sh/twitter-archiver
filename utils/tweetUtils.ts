import twitter from 'twitter-text';
import { Tweet } from '../models';

export const sanitizeTweet = (tweet: Tweet): Tweet => {
	const extendedTweet = (tweet as any).extended_tweet;

	if (!extendedTweet) {
		return tweet;
	}

	const { full_text } = extendedTweet;
	extendedTweet.text = full_text;

	return extendedTweet;
};

export const sanitizeEntities = (tweet: Tweet) => {
	const { entities, extended_entities } = tweet;

	if (!extended_entities) {
		return entities;
	}

	return {
		...entities,
		...extended_entities,
	};
};

export const sanitizeText = (tweet: Tweet): string => {
	const sanitizedTweet = sanitizeTweet(tweet);
	const sanitizedEntities = sanitizeEntities(sanitizedTweet);

	const fullText = sanitizedTweet.full_text ?? '';
	const urlEntities = sanitizedEntities.urls;

	return twitter.autoLink(fullText, { urlEntities });
};
