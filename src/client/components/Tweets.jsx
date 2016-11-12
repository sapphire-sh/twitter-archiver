'use strict';

import React, {
	Component,
	PropTypes
} from 'react';

import {
	dateToString
} from '../utils';

import '../styles/tweets.css';

class Tweets extends Component {
	render() {
		return (
			<div>
				{this.props.tweets.map((tweet) => {
					const tweetId = tweet.id;

					let isRetweet;
					if(tweet.retweeted_status) {
						isRetweet = (
							<div>
								<div>RT by <a href={ `https://twitter.com/${tweet.user.screen_name}` } target="_blank"><strong>{ tweet.user.name }</strong> (@{ tweet.user.screen_name })</a></div>
								<div style={{ margin: '2px 0' }}>
									<div className="created_at"><a href={ `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}` } target="_blank">{ dateToString(new Date(tweet.created_at)) }</a></div>
									<div className="source" dangerouslySetInnerHTML={{ __html: tweet.source.replace('<a ', '<a target="_blank" ') }} />
									<div className="clear"></div>
								</div>
							</div>
						)
						tweet = tweet.retweeted_status;
					}
					const user = tweet.user;

					return (
						<div className="attached ui segment" key={ tweetId }>
							{ isRetweet }
							<div className="tweet">
								<a href={ `https://twitter.com/${user.screen_name}` } target="_blank" className="user">
									<img src={ user.profile_image_url_https } className="user-profile_image" />
									<strong>{user.name}</strong>
									<span>@{user.screen_name}</span>
								</a>
								<div className="text">
									<div dangerouslySetInnerHTML={{ __html: tweet.text.replace(/\n/g, '<br />') }} />
								</div>
								<div>
									<div>RTs: { tweet.retweet_count }</div>
									<div>Likes: { tweet.favorite_count }</div>
								</div>
							</div>
							<div>
								<div className="created_at"><a href={ `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}` } target="_blank">{ dateToString(new Date(tweet.created_at)) }</a></div>
								<div className="source" dangerouslySetInnerHTML={{ __html: tweet.source.replace('<a ', '<a target="_blank" ') }} />
								<div className="clear"></div>
							</div>
						</div>
					);
				})}
			</div>
		)
	}
}

Tweets.propTypes = {
	tweets: PropTypes.array.isRequired
};

export default Tweets;
