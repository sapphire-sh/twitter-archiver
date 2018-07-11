import React from 'react';

import {
	connect,
} from 'react-redux';

import TweetComponent from './Tweet/Tweet';
import Retweet from './Tweet/Retweet';

import Indicator from './Indicator';

import {
	Tweet,
} from '../../shared/models';

import {
	State,
} from '../reducers';

import '../styles/Tweets.css';

interface ComponentProps {
	tweets: Tweet[];
};

class Tweets extends React.Component<ComponentProps> {
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
								<TweetComponent tweet={tweet} />
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
