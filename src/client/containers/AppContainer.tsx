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
	updateHistory,
} from '../actions';

import {
	State,
} from '../reducers';

import {
	getIsFetchingTweets,
	getTweets,
} from '../selectors';

import {
	Tweet,
} from '../../shared/models';

import {
	SocketContainer,
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

	invalidateTweets: typeof invalidateTweets;
	fetchTweetsIfNeeded: typeof fetchTweetsIfNeeded;
	updateHistory: typeof updateHistory;
}

class AppComponent extends React.Component<ComponentProps> {
	public render() {
		return (
			<div>
				<IndicatorComponent />
				<Container>
					<Grid>
						<Grid.Column width={4}>
							<MenuComponent {...this.props} />
						</Grid.Column>

						<Grid.Column floated="right" width={12}>
							<TweetsComponent {...this.props} />
						</Grid.Column>
					</Grid>

					<SocketContainer />
				</Container>
			</div>
		);
	}
}

function mapStateToProps(state: State) {
	return {
		'tweets': getTweets(state),
		'isFetchingTweets': getIsFetchingTweets(state),
	};
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
	return bindActionCreators({
		invalidateTweets,
		fetchTweetsIfNeeded,
		updateHistory,
	}, dispatch);
}

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
