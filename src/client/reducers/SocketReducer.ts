import {
	SocketKeys,
	SocketAction,
} from '../actions/types';

export interface SocketState {
	isConnected: boolean;
}

const initialState: SocketState = {
	'isConnected': false,
};

export function socket(state = initialState, action: SocketAction): SocketState {
	switch(action.type) {
	case SocketKeys.SOCKET_CONNECTED:
		return {
			...state,
			'isConnected': true,
		};
	case SocketKeys.SOCKET_DISCONNECTED:
		return {
			...state,
			'isConnected': false,
		};
	default:
		return state;
	}
}
