export enum SocketEventType {
	UPDATE_HISTORY = 'update_history',
	INSERT_TWEET = 'insert_tweet',
}

export interface SocketEvent {
	type: SocketEventType;
	message: string;
}
