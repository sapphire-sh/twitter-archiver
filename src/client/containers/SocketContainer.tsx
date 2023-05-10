import React from 'react';
import { connect } from 'react-redux';
import { AnyAction, Dispatch, bindActionCreators } from 'redux';
import {
  socketConnected,
  socketDisconnected,
  updateHistoryIfNeeded,
  updateLatestTweetIDIfNeeded,
  updateQueueCount,
} from '~/client/actions';
import { State } from '~/client/reducers';
import { SocketEvent, SocketEventType } from '~/shared/models';

interface ComponentProps {
  updateLatestTweetIDIfNeeded: typeof updateLatestTweetIDIfNeeded;
  updateHistoryIfNeeded: typeof updateHistoryIfNeeded;
  updateQueueCount: typeof updateQueueCount;
  socketConnected: typeof socketConnected;
  socketDisconnected: typeof socketDisconnected;
}

interface ComponentState {
  socket: SocketIOClient.Socket | null;
}

class SocketComponent extends React.Component<ComponentProps, ComponentState> {
  constructor(props: ComponentProps) {
    super(props);

    this.handleConnect = this.handleConnect.bind(this);
    this.handleDisconnect = this.handleDisconnect.bind(this);
    this.handleEvent = this.handleEvent.bind(this);

    this.state = {
      socket: null,
    };
  }

  private handleConnect() {
    this.props.socketConnected();
  }

  private handleDisconnect() {
    this.props.socketDisconnected();
  }

  private handleEvent(event: SocketEvent) {
    const { type, message } = event;

    switch (type) {
      case SocketEventType.INSERT_TWEET:
        this.props.updateLatestTweetIDIfNeeded(message);
        break;
      case SocketEventType.UPDATE_HISTORY:
        this.props.updateHistoryIfNeeded(message);
        break;
      case SocketEventType.QUEUE_COUNT:
        this.props.updateQueueCount(parseInt(message, 10));
        break;
    }
  }

  public componentDidMount() {
    const socket = io('');

    socket.on('connect', this.handleConnect);
    socket.on('disconnect', this.handleDisconnect);
    socket.on('event', this.handleEvent);

    this.setState({
      socket,
    });
  }

  public componentWillUnmount() {
    const { socket } = this.state;

    if (socket === null) {
      return;
    }

    socket.off('connect', this.handleConnect);
    socket.off('disconnect', this.handleDisconnect);
    socket.off('event', this.handleEvent);

    socket.disconnect();
  }

  public render() {
    return null;
  }
}

function mapStateToProps(state: State) {
  return {};
}

function mapDispatchToProps(dispatch: Dispatch<AnyAction>) {
  return bindActionCreators(
    {
      updateLatestTweetIDIfNeeded,
      updateHistoryIfNeeded,
      updateQueueCount,
      socketConnected,
      socketDisconnected,
    },
    dispatch
  );
}

export const SocketContainer = connect(mapStateToProps, mapDispatchToProps)(SocketComponent);
