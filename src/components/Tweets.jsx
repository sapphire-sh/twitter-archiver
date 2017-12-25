import React from 'react';
import {
	connect,
} from 'react-redux';
import {
	PropTypes,
} from 'prop-types';

import Tweet from './Tweet/Tweet';
import Retweet from './Tweet/Retweet';

import {
	dateToString,
} from '../utils/date';

import '../styles/Tweets.css';

class Tweets extends React.Component {
	render() {
		const tweets = this.props.tweets;

		let indicator = null;
		if(this.props.tweets.length === 0) {
			if(this.props.isFetching) {
				indicator = (
					<div className="ui segment attached">loading...</div>
				);
			}
			else {
				indicator = (
					<div className="ui segment attached">none</div>
				);
			}
		}

		return (
			<div>
				{ indicator }
				{
					tweets.map((tweet, i) => {
						if(tweet.retweeted_status === undefined) {
							return (
								<div key={tweet.id_str} className="ui segment attached">
									<Tweet tweet={tweet} />
								</div>
							);
						}
						return (
							<div key={tweet.id_str} className="ui segment attached">
								<Retweet tweet={tweet} />
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
	'isFetching': PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
	let tweets = state.tweets.tweets[dateToString(state.date.date).substr(0, 13)];

	if(tweets === undefined) {
		tweets = [];
	}

	return {
		'date': state.date.date,
		'isFetching': state.tweets.isFetching,
		'tweets': tweets,
	};
}

export default connect(mapStateToProps)(Tweets);
