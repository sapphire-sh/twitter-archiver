import * as React from 'react';

import Profile from './Profile';
import Text from './Text';
import Count from './Count';
import Media from './Media';
import Footer from './Footer';

import {
	Tweet as _Tweet,
} from '../../models';

interface TweetProps {
	tweet: _Tweet;
};

class Tweet extends React.Component<TweetProps> {
	getEntities(tweet: _Tweet) {
		const extendedTweet = (tweet as any).extended_tweet;
		if(extendedTweet !== undefined) {
			tweet.text = extendedTweet.full_text;
			tweet.entities = extendedTweet.entities;
			(tweet as any).extended_entities = extendedTweet.extended_entities;
		}

		return Object.assign({}, tweet.entities, (tweet as any).extended_entities);
	}

	render() {
		const tweet = this.props.tweet;

		const entities = this.getEntities(tweet);

		return (
			<div className="tweet">
				<Profile user={tweet.user} isRetweet={ false } />
				<div className="ui segments">
					<div className="ui top attached segment">
						<Text text={tweet.text} entities={ entities } />
					</div>
					<Media entities={entities} />
					<Count counts={{
						'reply': 0,
						'retweet': (tweet as any).retweet_count,
						'favorite': (tweet as any).favorite_count,
					}} />
					<Footer tweet={tweet} />
				</div>
			</div>
		);
	}
}

export default Tweet;
