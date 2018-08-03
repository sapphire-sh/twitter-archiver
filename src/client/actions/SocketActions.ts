import {
	SocketKeys,
	SocketConnectedAction,
	SocketDisconnectedAction,
} from './types/SocketActionTypes';

export function socketConnected(): SocketConnectedAction {
	return {
		'type': SocketKeys.SOCKET_CONNECTED,
	};
}

export function socketDisconnected(): SocketDisconnectedAction {
	return {
		'type': SocketKeys.SOCKET_DISCONNECTED,
	};
}
