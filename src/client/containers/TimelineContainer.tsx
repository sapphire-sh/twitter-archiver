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
} from '../actions';

import {
	State,
} from '../reducers';

import {
	getIsFetchingTweets,
	getDidInvalidateTweets,
	getTweets,
	getHistoryID,
} from '../selectors';

import {
	Tweet,
} from '../../shared/models';

import {
	PlaceholderComponent,
	TweetElementComponent,
} from '../components';

import {
	Segment,
} from 'semantic-ui-react';

import '../styles/TweetsComponent.scss';
import '../styles/TimelineContainer.scss';

interface ComponentProps {
	isFetchingTweets: boolean;
	didInvalidateTweets: boolean;
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
			didInvalidateTweets,
			tweets,
			historyID,
		} = this.props;

		if(didInvalidateTweets === true) {
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
		'didInvalidateTweets': getDidInvalidateTweets(state),
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
