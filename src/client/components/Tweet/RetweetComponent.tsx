import React from 'react';

import {
	updateHistoryIfNeeded,
	openModal,
} from '../../actions';

import {
	Tweet,
} from '../../../shared/models';

import {
	ProfileComponent,
	TweetComponent,
} from '../../components';

interface ComponentProps {
	tweet: Tweet;

	updateHistoryIfNeeded: typeof updateHistoryIfNeeded;
	openModal: typeof openModal;
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
				<TweetComponent {...this.props} tweet={retweeted_status} />
			</div>
		);
	}
}
