import http from 'http';
import SocketIO, { Server } from 'socket.io';
import { SocketEvent, SocketEventType } from '~/shared/models';

export class Socket {
  private static io: SocketIO.Server;

  private static sockets: {
    [key: string]: SocketIO.Socket;
  };

  public static initialize(server: http.Server) {
    this.io = new Server(server);

    this.sockets = {};

    this.io.on('connection', (socket) => {
      this.sockets[socket.id] = socket;
      console.log(`${socket.id} connected`);

      socket.emit('event', {
        message: 'connect',
      });

      socket.on('event', (event) => {
        console.log(event.message);
      });

      socket.on('disconnect', () => {
        delete this.sockets[socket.id];
        console.log(`${socket.id} disconnected`);
      });
    });
  }

  public static emit(type: SocketEventType, message: string) {
    const event: SocketEvent = {
      type,
      message,
    };

    Object.values(this.sockets).forEach((socket) => {
      socket.emit('event', event);
    });
  }
}
