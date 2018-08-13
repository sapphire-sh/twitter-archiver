import React from 'react';

import {
	updateHistoryIfNeeded,
	openModal,
} from '../../actions';

import {
	Tweet,
} from '../../../shared/models';

import {
	HeaderComponent,
	TweetComponent,
	FooterComponent,
} from '../../components';

import {
	Segment,
} from 'semantic-ui-react';

interface ComponentProps {
	tweet: Tweet;
	isRetweet: boolean;
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
			<div className="tweet retweet">
				<HeaderComponent {...this.props} isRetweet={false} />
				<Segment.Group size="tiny">
					<Segment>
						<TweetComponent {...this.props} tweet={retweeted_status} />
					</Segment>
				</Segment.Group>
				<FooterComponent {...this.props} />
			</div>
		);
	}
}
