import React from 'react';

import {
	Dispatch,
	bindActionCreators,
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
	getTweets,
	getHistoryID,
	getQueueCount,
	getIsSocketConnected,
} from '../selectors';

import {
	Tweet,
} from '../../shared/models';

import {
	SocketContainer,
	ModalContainer,
} from '../containers';

import {
	IndicatorComponent,
	MenuComponent,
	TweetsComponent,
} from '../components';

import {
	Container,
	Grid,
} from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

import '../styles/App.scss';

interface ComponentProps {
	isFetchingTweets: boolean;
	tweets: Tweet[];
	historyID: string;
	queueCount: number;
	isSocketConnected: boolean;

	invalidateTweets: typeof invalidateTweets;
	fetchTweetsIfNeeded: typeof fetchTweetsIfNeeded;
	updateHistoryIfNeeded: typeof updateHistoryIfNeeded;
	openModal: typeof openModal;
}

class AppComponent extends React.Component<ComponentProps> {
	public render() {
		return (
			<div>
				<IndicatorComponent {...this.props} />
				<Container>
					<Grid>
						<Grid.Column width={4}>
							<MenuComponent {...this.props} />
						</Grid.Column>

						<Grid.Column floated="right" width={12}>
							<TweetsComponent {...this.props} />
						</Grid.Column>
					</Grid>
				</Container>

				<ModalContainer />
				<SocketContainer />
			</div>
		);
	}
}

function mapStateToProps(state: State) {
	return {
		'tweets': getTweets(state),
		'isFetchingTweets': getIsFetchingTweets(state),
		'historyID': getHistoryID(state),
		'queueCount': getQueueCount(state),
		'isSocketConnected': getIsSocketConnected(state),
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

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
