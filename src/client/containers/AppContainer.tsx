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
	State,
} from '../reducers';

import {
	getIsSocketConnected,
} from '../selectors';

import {
	TimelineContainer,
	ModalContainer,
	MenuContainer,
	SocketContainer,
} from '../containers';

import {
	IndicatorComponent,
} from '../components';

import {
	Container,
	Grid,
} from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';

import '../styles/App.scss';

interface ComponentProps {
	isSocketConnected: boolean;
}

class AppComponent extends React.Component<ComponentProps> {
	public componentDidMount() {
		window.scroll(0, 0);
	}

	public render() {
		return (
			<div>
				<IndicatorComponent {...this.props} />
				<Container>
					<Grid>
						<Grid.Column width={4}>
							<MenuContainer />
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
		'isSocketConnected': getIsSocketConnected(state),
	};
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
	return bindActionCreators({}, dispatch);
}

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppComponent);
