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
	updateHistoryIfNeeded,
} from '../actions';

import {
	SocketEventType,
	SocketEvent,
} from '../../shared/models';

import {
	State,
} from '../reducers';

interface ComponentProps {
	updateLatestTweetIDIfNeeded: typeof updateLatestTweetIDIfNeeded;
	updateHistoryIfNeeded: typeof updateHistoryIfNeeded;
}

class SocketComponent extends React.Component<ComponentProps> {
	public componentDidMount() {
		const socket = io('https://archive.sapphire.sh');
		socket.on('event', (event: SocketEvent) => {
			const {
				type,
				message,
			} = event;

			switch(type) {
			case SocketEventType.INSERT_TWEET:
				this.props.updateLatestTweetIDIfNeeded(message);
				break;
			case SocketEventType.UPDATE_HISTORY:
				this.props.updateHistoryIfNeeded(message);
				break;
			}
		});
	}

	public render() {
		return null;
	}
}

function mapStateToProps(state: State) {
	return {};
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
	return bindActionCreators({
		'updateLatestTweetIDIfNeeded': updateLatestTweetIDIfNeeded,
		'updateHistoryIfNeeded': updateHistoryIfNeeded,
	}, dispatch);
}

export const SocketContainer = connect(mapStateToProps, mapDispatchToProps)(SocketComponent);
