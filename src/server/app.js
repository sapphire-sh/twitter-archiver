'use strict';

import path from 'path';

import Server from './libs/server';
import Stream from './libs/stream';
import Database from './libs/database';

import CONFIG from '../../config';

class App {
	async start() {
		Server.initialize({
			port: 8015
		});
		Stream.initialize(CONFIG);
		Database.initialize({
			dialect: 'sqlite',
			logging: false,
			storage: path.resolve(__dirname, '../../database.sqlite')
		});

		Server.start();
		Stream.start();
	}
}

try {
	const app = new App();
	app.start();
}
catch(err) {
	console.error(err);
}

export default App;
