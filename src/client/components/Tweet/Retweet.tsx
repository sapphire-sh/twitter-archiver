import React from 'react';

import Profile from './Profile';
import TweetComponent from './Tweet';

import {
	Tweet,
} from '../../../shared/models';

interface ComponentProps {
	tweet: Tweet;
};

class Retweet extends React.Component<ComponentProps> {
	render() {
		const tweet = this.props.tweet;

		return (
			<div>
				<div>
					<Profile user={tweet.user} isRetweet={ true } />
				</div>
				<TweetComponent tweet={tweet.retweeted_status!} />
			</div>
		);
	}
}

export default Retweet;
