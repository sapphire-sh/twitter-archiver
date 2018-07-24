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

import {
	sendRequest,
	RequestType,
} from '../../shared/helpers';

import '../styles/Tweets.css';

interface ComponentProps {
	tweets: Tweet[];
};

class Tweets extends React.Component<ComponentProps> {
	private onClick(id: string) {
		sendRequest(RequestType.SET_HISTORY, {
			'id': id,
		}).then((res) => {
			console.log(res);
		}).catch((err) => {
			console.log(err);
		});
	}

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
								<div className="ui button" onClick={() => {
									this.onClick(tweet.id_str);
								}}>{tweet.id_str}</div>
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
