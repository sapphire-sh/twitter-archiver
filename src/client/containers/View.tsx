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

import Tweets from '../components/Tweets';

import {
	MenuComponent,
} from '../components';

import {
	Grid,
	Sticky,
} from 'semantic-ui-react';

interface ViewProps {
	invalidateTweets: typeof invalidateTweets;
	fetchTweetsIfNeeded: typeof fetchTweetsIfNeeded;
}

interface ViewState {
	contextRef: HTMLDivElement | null;
}

class View extends React.Component<ViewProps, ViewState> {
	constructor(props: ViewProps) {
		super(props);

		this.state = {
			'contextRef': null,
		};
	}
	
	handleContextRef = (contextRef: HTMLDivElement) => {
		this.setState({
			'contextRef': contextRef,
		});
	}

	render() {
		const {
			contextRef,
		} = this.state;

		return (
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
						<Tweets {...this.props} />
					</div>
				</Grid.Column>
			</Grid>
		);
	}
}

function mapStateToProps(state: State) {
	return {};
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
	return bindActionCreators({
		invalidateTweets,
		fetchTweetsIfNeeded,
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(View);
