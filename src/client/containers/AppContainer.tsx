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
} from '../actions';

import {
	State,
} from '../reducers';

import {
	getQueueCount,
	getIsSocketConnected,
} from '../selectors';

import {
	TimelineContainer,
	ModalContainer,
	SocketContainer,
} from '../containers';

import {
	IndicatorComponent,
	MenuComponent,
} from '../components';

import {
	Container,
	Grid,
} from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

import '../styles/App.scss';

interface ComponentProps {
	queueCount: number;
	isSocketConnected: boolean;

	invalidateTweets: typeof invalidateTweets;
	fetchTweetsIfNeeded: typeof fetchTweetsIfNeeded;
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
							<TimelineContainer />
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
		'queueCount': getQueueCount(state),
		'isSocketConnected': getIsSocketConnected(state),
	};
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
	return bindActionCreators({
		'invalidateTweets': invalidateTweets,
		'fetchTweetsIfNeeded': fetchTweetsIfNeeded,
	}, dispatch);
}

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
