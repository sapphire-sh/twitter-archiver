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
		const {
			tweet,
		} = this.props;

		const {
			user,
			retweeted_status,
		} = tweet;

		return (
			<div>
				<div>
					<ProfileComponent user={user} isRetweet={true} />
				</div>
				<TweetComponent tweet={retweeted_status!} />
			</div>
		);
	}
}
