import {
	Action,
} from 'redux';

export enum SocketKeys {
	SOCKET_CONNECTED = 'SOCKET_CONNECTED',
	SOCKET_DISCONNECTED = 'SOCKET_DISCONNECTED',
}

export interface SocketConnectedAction extends Action {
	type: SocketKeys.SOCKET_CONNECTED;
}

export interface SocketDisconnectedAction extends Action {
	type: SocketKeys.SOCKET_DISCONNECTED;
}

export type SocketAction = (
	| SocketConnectedAction
	| SocketDisconnectedAction
);
