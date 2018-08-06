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
	FooterComponent,
} from '../../components';

interface ComponentProps {
	tweet: Tweet;
	isQuote: boolean;

	updateHistoryIfNeeded: typeof updateHistoryIfNeeded;
	openModal: typeof openModal;
}

export class RetweetComponent extends React.Component<ComponentProps> {
	public render() {
		const {
			tweet,
		} = this.props;

		const {
			retweeted_status,
		} = tweet;

		return (
			<div className="retweet">
				<div>
					<ProfileComponent {...this.props} />
				</div>
				<TweetComponent {...this.props} tweet={retweeted_status} isRetweet={true} />
				<FooterComponent {...this.props} isRetweet={false} />
			</div>
		);
	}
}
