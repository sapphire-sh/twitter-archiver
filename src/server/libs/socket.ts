import http from 'http';

import SocketIO from 'socket.io';

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

			socket.on('disconnect', () => {
				delete this.sockets[socket.id];
				console.log(`${socket.id} disconnected`);
			});
		});
	}

	public static emit(message: string) {
		Object.values(this.sockets).forEach((socket) => {
			socket.emit('event', {
				'message': message,
			});
		});
	}
}