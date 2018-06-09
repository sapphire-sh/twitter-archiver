import * as React from 'react';
import {
	connect,
} from 'react-redux';

import Tweet from './Tweet/Tweet';
import Retweet from './Tweet/Retweet';

import Indicator from './Indicator';

import {
	Tweet as _Tweet,
} from '../../shared/models';

import {
	State,
} from '../reducers';

import '../styles/Tweets.css';

interface TweetsProps {
	tweets: _Tweet[];
};

class Tweets extends React.Component<TweetsProps> {
	render() {
		const tweets = this.props.tweets;

		return (
			<div>
				<Indicator />
				{
					tweets.map((tweet) => {
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

function mapStateToProps(state: State) {
	return {
		'tweets': state.tweet.tweets,
	};
}

export default connect(mapStateToProps)(Tweets);
