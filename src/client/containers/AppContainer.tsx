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
	MenuComponent,
	TweetsComponent,
} from '../components';

import {
	Grid,
	Sticky,
} from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import '../styles/index.css';

interface ComponentProps {
	isFetchingTweets: boolean;
	tweets: Tweet[];

	invalidateTweets: typeof invalidateTweets;
	fetchTweetsIfNeeded: typeof fetchTweetsIfNeeded;
	updateHistory: typeof updateHistory;
}

interface ComponentState {
	contextRef: HTMLDivElement | null;
}

class AppComponent extends React.Component<ComponentProps, ComponentState> {
	constructor(props: ComponentProps) {
		super(props);

		this.state = {
			'contextRef': null,
		};
	}

	private handleContextRef = (contextRef: HTMLDivElement) => {
		this.setState({
			'contextRef': contextRef,
		});
	}

	public render() {
		const {
			contextRef,
		} = this.state;

		return (
			<div className="ui container">
				<Grid>
					<Grid.Column width={4}>
						{(() => {
							if(contextRef === null) {
								return null;
							}
							return (
								<Sticky offset={40} context={contextRef}>
									<MenuComponent {...this.props} />
								</Sticky>
							);
						})()}
					</Grid.Column>

					<Grid.Column width={12}>
						<div ref={this.handleContextRef}>
							<TweetsComponent {...this.props} />
						</div>
					</Grid.Column>
				</Grid>

				<SocketContainer />
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
