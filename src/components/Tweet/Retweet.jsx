import React from 'react';
import {
	PropTypes,
} from 'prop-types';

import Tweet from './Tweet';

import {
	dateToString,
} from '../../utils';

class Retweet extends React.Component {
	render() {
		const tweet = this.props.tweet;
		const user = tweet.user;

		return (
			<div>
				<div>
					<a style={{
						'marginBottom': '4px',
						'color': '#fff',
						'backgroundColor': `#${user.profile_link_color}`,
					}} href={ `https://twitter.com/${user.screen_name}` } target="_blank" className="ui ribbon image label">
						<img src={ user.profile_image_url_https } />
						{ user.name }
						<div className="detail">@{ user.screen_name }</div>
					</a>
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
