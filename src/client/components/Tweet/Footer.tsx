import * as React from 'react';

import {
	Tweet,
} from '../../../shared/models';

import {
	dateToString,
} from '../../../shared/helpers';

interface FooterProps {
	tweet: Tweet;
}

class Footer extends React.Component<FooterProps> {
	render() {
		const tweet = this.props.tweet;

		const tweetUrl = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`;

		return (
			<div className="ui bottom attached segment" style={{
				'display': 'flex',
				'justifyContent': 'space-between',
			}}>
				<div className="created_at">
					<a href={ tweetUrl } target="_blank">{ dateToString(new Date(tweet.created_at)) }</a>
				</div>
				<div className="source" dangerouslySetInnerHTML={{
					'__html': tweet.source!,
				}} />
			</div>
		);
	}
}

export default Footer;
