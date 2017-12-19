import React from 'react';
import {
	PropTypes,
} from 'prop-types';

import twitter from 'twitter-text';

import Text from './Text';
import Count from './Count';
import Media from './Media';
import Footer from './Footer';

class Tweet extends React.Component {
	render() {
		const tweet = this.props.tweet;
		const user = tweet.user;

		const extendedTweet = tweet.extended_tweet;
		if(extendedTweet !== undefined) {
			tweet.text = extendedTweet.full_text;
			tweet.entities = extendedTweet.entities;
			tweet.extended_entities = extendedTweet.extended_entities;
		}

		const entities = Object.assign({}, tweet.entities, tweet.extended_entities);

		return (
			<div className="tweet">
				<a style={{
					'color': '#ffffff',
					'backgroundColor': `#${user.profile_link_color}`,
				}} href={ `https://twitter.com/${user.screen_name}` } target="_blank" className="ui ribbon image label">
					<img src={ user.profile_image_url_https } />
					{ user.name }
					<div className="detail">@{ user.screen_name }</div>
				</a>
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
