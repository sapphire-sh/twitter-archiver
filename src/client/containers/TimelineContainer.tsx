import React from 'react';

import {
	bindActionCreators,
	Dispatch,
	AnyAction,
} from 'redux';

import {
	connect,
} from 'react-redux';

import {
	invalidateTweets,
	fetchTweetsIfNeeded,
	updateHistoryIfNeeded,
	openModal,
} from '~/client/actions';

import {
	State,
} from '~/client/reducers';

import {
	getIsFetchingTweets,
	getTweets,
	getHistoryID,
} from '~/client/selectors';

import {
	Tweet,
} from '~/shared/models';

import {
	PlaceholderComponent,
	TweetElementComponent,
} from '~/client/components';

import {
	Segment,
} from 'semantic-ui-react';

import '~/client/styles/TweetsComponent.scss';
import '~/client/styles/TimelineContainer.scss';

interface ComponentProps {
	isFetchingTweets: boolean;
	tweets: Tweet[];
	historyID: string;

	invalidateTweets: typeof invalidateTweets;
	fetchTweetsIfNeeded: typeof fetchTweetsIfNeeded;
	updateHistoryIfNeeded: typeof updateHistoryIfNeeded;
	openModal: typeof openModal;
}

class TimelineComponent extends React.Component<ComponentProps> {
	public componentDidMount() {
		this.props.invalidateTweets();
		this.props.fetchTweetsIfNeeded();
	}

	public render() {
		const {
			tweets,
			historyID,
		} = this.props;

		if (tweets.length === 0) {
			return (
				<Segment.Group size="tiny">
					<Segment>
						<div>loading...</div>
					</Segment>
				</Segment.Group>
			);
		}

		return (
			<div id="timeline">
				<Segment.Group size="tiny">
					<PlaceholderComponent {...this.props} />
					{tweets.filter((tweet) => {
						return tweet.id_str >= historyID;
					}).map((tweet) => {
						return (
							<TweetElementComponent key={tweet.id_str} tweet={tweet} {...this.props} />
						);
					})}
				</Segment.Group>
			</div>
		);
	}
}

function mapStateToProps(state: State) {
	return {
		'tweets': getTweets(state),
		'isFetchingTweets': getIsFetchingTweets(state),
		'historyID': getHistoryID(state),
	};
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
	return bindActionCreators({
		'invalidateTweets': invalidateTweets,
		'fetchTweetsIfNeeded': fetchTweetsIfNeeded,
		'updateHistoryIfNeeded': updateHistoryIfNeeded,
		'openModal': openModal,
	}, dispatch);
}

export const TimelineContainer = connect(mapStateToProps, mapDispatchToProps)(TimelineComponent);
