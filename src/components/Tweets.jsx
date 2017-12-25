import React from 'react';
import {
	connect,
} from 'react-redux';
import {
	PropTypes,
} from 'prop-types';

import Tweet from './Tweet/Tweet';
import Retweet from './Tweet/Retweet';

import Indicator from './Indicator';

import {
	dateToString,
} from '../utils/date';

import '../styles/Tweets.css';

class Tweets extends React.Component {
	render() {
		const tweets = this.props.tweets;

		return (
			<div>
				<Indicator />
				{
					tweets.map((tweet, i) => {
						let component;
						if(tweet.retweeted_status === undefined) {
							component = (
								<Tweet tweet={tweet} />
							);
						}
						else {
							component = (
								<Retweet tweet={tweet} />
							);
						}

						return (
							<div key={tweet.id_str} className="ui segment attached">
								{ component }
							</div>
						);
					})
				}
			</div>
		);
	}
}

Tweets.propTypes = {
	'tweets': PropTypes.array.isRequired,
};

function mapStateToProps(state) {
	let tweets = state.tweets.tweets[dateToString(state.date.date).substr(0, 13)];

	if(tweets === undefined) {
		tweets = [];
	}

	return {
		'tweets': tweets,
	};
}

export default connect(mapStateToProps)(Tweets);
