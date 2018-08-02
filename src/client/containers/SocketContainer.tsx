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
	updateLatestTweetIDIfNeeded,
} from '../actions';

import {
	State,
} from '../reducers';

interface ComponentProps {
	updateLatestTweetIDIfNeeded: typeof updateLatestTweetIDIfNeeded;
}

class SocketComponent extends React.Component<ComponentProps> {
	componentDidMount() {
		const socket = io('https://archive.sapphire.sh');
		socket.on('event', (event) => {
			console.log(event);
			socket.emit('event', {
				'message': event.message,
			});
		});
	}

	render() {
		return null;
	}
}

function mapStateToProps(state: State) {
	return {};
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
	return bindActionCreators({
		'updateLatestTweetIDIfNeeded': updateLatestTweetIDIfNeeded,
	}, dispatch);
}

export const SocketContainer = connect(mapStateToProps, mapDispatchToProps)(SocketComponent);