import http from 'http';
import { Server, Socket } from 'socket.io';
import { SocketEvent, SocketEventType } from '../models';

export class SocketService {
	private static io: Server;

	private static sockets: {
		[key: string]: Socket;
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
			type: type,
			message: message,
		};

		Object.values(this.sockets).forEach((socket) => {
			socket.emit('event', event);
		});
	}
}
