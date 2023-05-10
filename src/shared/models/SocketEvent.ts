export enum SocketEventType {
  UPDATE_HISTORY = 'update_history',
  INSERT_TWEET = 'insert_tweet',
  QUEUE_COUNT = 'queue_count',
}

export interface SocketEvent {
  type: SocketEventType;
  message: string;
}
