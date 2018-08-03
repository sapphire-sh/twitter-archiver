import http from 'http';

import SocketIO from 'socket.io';

import {
	SocketEventType,
	SocketEvent,
} from '../../shared/models';

export class Socket {
	private static io: SocketIO.Server;

	private static sockets: {
		[key: string]: SocketIO.Socket;
	};

	public static initialize(server: http.Server) {
		this.io = SocketIO(server);

		this.sockets = {};

		this.io.on('connection', (socket) => {
			this.sockets[socket.id] = socket;
			console.log(`${socket.id} connected`);

			socket.emit('event', {
				'message': 'connect',
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
			'type': type,
			'message': message,
		};

		Object.values(this.sockets).forEach((socket) => {
			socket.emit('event', event);
		});
	}
}
