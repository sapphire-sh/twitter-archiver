import React from 'react';

import {
	updateHistoryIfNeeded,
	openModal,
} from '../actions';

import {
	Tweet,
} from '../../shared/models';

import {
	TweetComponent,
	RetweetComponent,
} from '../components';

import {
	Segment,
} from 'semantic-ui-react';

interface ComponentProps {
	tweet: Tweet;

	updateHistoryIfNeeded: typeof updateHistoryIfNeeded;
	openModal: typeof openModal;
}

export class TweetElementComponent extends React.Component<ComponentProps> {
	public render() {
		const {
			tweet,
		} = this.props;

		return (
			<Segment key={tweet.id_str} className="tweet-segment">
				{(() => {
					if(tweet.retweeted_status === undefined) {
						return (
							<TweetComponent {...this.props} isRetweet={false} isQuote={false} />
						);
					}
					return (
						<RetweetComponent {...this.props} isRetweet={true} isQuote={false} />
					);
				})()}
			</Segment>
		);
	}
}
