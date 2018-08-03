import React from 'react';

import {
	updateHistoryIfNeeded,
} from '../actions';

import {
	Tweet,
} from '../../shared/models';

import {
	PlaceholderComponent,
	TweetSegmentComponent,
} from '../components';

import {
	Segment,
} from 'semantic-ui-react';

import '../styles/Tweets.scss';

interface ComponentProps {
	isFetchingTweets: boolean;
	tweets: Tweet[];
	historyID: string;

	updateHistoryIfNeeded: typeof updateHistoryIfNeeded;
}

export class TweetsComponent extends React.Component<ComponentProps> {
	public render() {
		const {
			tweets,
			historyID,
		} = this.props;

		return (
			<div>
				<Segment.Group>
					<PlaceholderComponent {...this.props} />
					{tweets.filter((tweet) => {
						return tweet.id_str >= historyID;
					}).map((tweet) => {
						return (
							<TweetSegmentComponent key={tweet.id_str} tweet={tweet} {...this.props} />
						);
					})}
				</Segment.Group>
			</div>
		);
	}
}
