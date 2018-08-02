import React from 'react';

import {
	Tweet,
} from '../../../shared/models';

import {
	ProfileComponent,
	TweetComponent,
} from '../../components';

interface ComponentProps {
	tweet: Tweet;
}

export class RetweetComponent extends React.Component<ComponentProps> {
	public render() {
		const tweet = this.props.tweet;

		return (
			<div>
				<div>
					<ProfileComponent user={tweet.user} isRetweet={true} />
				</div>
				<TweetComponent tweet={tweet.retweeted_status!} />
			</div>
		);
	}
}
