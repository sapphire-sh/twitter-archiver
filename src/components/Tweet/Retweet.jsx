import React from 'react';
import {
	PropTypes,
} from 'prop-types';

import Profile from './Profile';
import Tweet from './Tweet';

class Retweet extends React.Component {
	render() {
		const tweet = this.props.tweet;

		return (
			<div>
				<div>
					<Profile user={ tweet.user } isRetweet={ true } />
				</div>
				<Tweet tweet={ tweet.retweeted_status } />
			</div>
		);
	}
}

Retweet.propTypes = {
	'tweet': PropTypes.object.isRequired,
};

export default Retweet;
