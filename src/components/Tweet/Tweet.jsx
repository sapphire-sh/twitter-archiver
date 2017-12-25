import React from 'react';
import {
	PropTypes,
} from 'prop-types';

import twitter from 'twitter-text';

import Profile from './Profile';
import Text from './Text';
import Count from './Count';
import Media from './Media';
import Footer from './Footer';

class Tweet extends React.Component {
	getEntities(tweet) {
		const extendedTweet = tweet.extended_tweet;
		if(extendedTweet !== undefined) {
			tweet.text = extendedTweet.full_text;
			tweet.entities = extendedTweet.entities;
			tweet.extended_entities = extendedTweet.extended_entities;
		}

		return Object.assign({}, tweet.entities, tweet.extended_entities);
	}

	render() {
		const tweet = this.props.tweet;

		const entities = this.getEntities(tweet);

		return (
			<div className="tweet">
				<Profile user={ tweet.user } isRetweet={ false } />
				<div className="ui segments">
					<div className="ui top attached segment">
						<Text text={ tweet.text } entities={ entities } />
					</div>
					<Media entities={ entities } />
					<Count counts={{
						'reply': 0,
						'retweet': tweet.retweet_count,
						'favorite': tweet.favorite_count,
					}} />
					<Footer tweet={tweet} />
				</div>
			</div>
		);
	}
}

Tweet.propTypes = {
	'tweet': PropTypes.object.isRequired,
};

export default Tweet;
