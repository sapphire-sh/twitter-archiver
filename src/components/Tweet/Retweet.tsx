import * as React from 'react';

import Profile from './Profile';
import Tweet from './Tweet';

import {
	Tweet as _Tweet,
} from '../../models';

interface RetweetProps {
	tweet: _Tweet;
};

class Retweet extends React.Component<RetweetProps> {
	render() {
		const tweet = this.props.tweet;

		return (
			<div>
				<div>
					<Profile user={tweet.user} isRetweet={ true } />
				</div>
				<Tweet tweet={tweet.retweeted_status!} />
			</div>
		);
	}
}

export default Retweet;
