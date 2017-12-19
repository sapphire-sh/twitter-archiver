import React from 'react';
import {
	PropTypes,
} from 'prop-types';

import Tweet from './Tweet/Tweet';
import Retweet from './Tweet/Retweet';

import '../styles/Tweets.css';

class Tweets extends React.Component {
	render() {
		const tweets = this.props.tweets;

		return (
			<div>
				{
					tweets.map((tweet, i) => {
						if(tweet.retweeted_status === undefined) {
							return (
								<div className="attached ui segment" key={tweet.id_str}>
									<Tweet tweet={tweet} />
								</div>
							);
						}
						return (
							<div className="attached ui segment" key={tweet.id_str}>
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
};

export default Tweets;
