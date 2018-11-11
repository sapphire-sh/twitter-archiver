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
} from '../../components';

import {
	Segment,
} from 'semantic-ui-react';

interface ComponentProps {
	tweet: Tweet;
	retweet: Tweet;
	isRetweet: boolean;
	isQuote: boolean;

	updateHistoryIfNeeded: typeof updateHistoryIfNeeded;
	openModal: typeof openModal;
}

export class RetweetComponent extends React.Component<ComponentProps> {
	public render() {
		const {
			tweet,
			retweet,
		} = this.props;

		return (
			<div
				className="tweet retweet"
			>
				<HeaderComponent
					{...this.props}
					isRetweet={false}
				/>
				<Segment.Group
					size="tiny"
				>
					<Segment>
						<TweetComponent
							{...this.props}
							tweet={retweet}
						/>
					</Segment>
				</Segment.Group>
			</div>
		);
	}
}
