'use strict';

import React, {
	Component,
	PropTypes
} from 'react';
import twitterText from 'twitter-text';

import {
	dateToString
} from '../utils';

import '../styles/Tweets.css';

class Tweets extends Component {
	render() {
		return (
			<div>
				{this.props.tweets.map((tweet) => {
					const tweetId = tweet.id;

					let isRetweet;
					if(tweet.retweeted_status) {
						const user = tweet.user;

						isRetweet = (
							<div>
								<a style={{
										color: '#fff',
										backgroundColor: `#${user.profile_link_color}`
									}} href={ `https://twitter.com/${user.screen_name}` } target="_blank" className="ui ribbon image label">
									<img src={ user.profile_image_url_https } />
									{ user.name }
									<div className="detail">@{ user.screen_name }</div>
								</a>
								<div className="ui segment" style={{
										marginBottom: '1rem',
										display: 'flex',
										justifyContent: 'space-between'
									}}>
									<div className="created_at"><a href={ `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}` } target="_blank">{ dateToString(new Date(tweet.created_at)) }</a></div>
									<div className="source" dangerouslySetInnerHTML={{ __html: tweet.source.replace('<a ', '<a target="_blank" ') }} />
								</div>
							</div>
						)
						tweet = tweet.retweeted_status;
					}

					let status;
					if(tweet.retweet_count > 0 || tweet.favorite_count > 0) {
						status = (
							<div className="ui attached segment">
								<div className="ui label">
									<i className="retweet icon"></i> { tweet.retweet_count }
									</div>
								<div className="ui label">
									<i className="star icon"></i> { tweet.favorite_count }
								</div>
							</div>
						)
					}

					let media;
					if(tweet.entities.media !== undefined) {
						media = tweet.entities.media.map((medium) => {
							return (
								<div key={medium.id_str} className="ui attached segment">
									<img style={{
										margin: '0 auto'
									}} className="ui medium rounded image" src={medium.media_url_https} />
								</div>
							);
						});
					}
					console.log(tweet.entities.media);

					const user = tweet.user;

					return (
						<div className="attached ui segment" key={ tweetId }>
							{ isRetweet }
							<div className="tweet">
								<a style={{
										color: `#fff`,
										backgroundColor: `#${user.profile_link_color}`
									}} href={ `https://twitter.com/${user.screen_name}` } target="_blank" className="ui ribbon image label">
									<img src={ user.profile_image_url_https } />
									{ user.name }
									<div className="detail">@{ user.screen_name }</div>
								</a>
								<div className="ui segments">
									<div className="ui top attached segment">
										<div className="text">
											<div dangerouslySetInnerHTML={{ __html: twitterText.autoLink(tweet.text, {
													urlEntities: tweet.entities.urls
												}).replace(/<a /g, '<a target="_blank" ').replace(/\n/g, '<br />') }} />
											</div>
										</div>
										{ media }
										{ status }
										<div className="ui bottom attached segment" style={{
											display: 'flex',
											justifyContent: 'space-between'
										}}>
										<div className="created_at"><a href={ `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}` } target="_blank">{ dateToString(new Date(tweet.created_at)) }</a></div>
										<div className="source" dangerouslySetInnerHTML={{ __html: tweet.source.replace('<a ', '<a target="_blank" ') }} />
									</div>
								</div>
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
