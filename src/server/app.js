'use strict';

import Server from './lib/server';
import Stream from './lib/stream';
import Database from './lib/database';

class App {
	constructor() {
		let self = this;

		console.log('app started');

		Promise.all([
			Server.initialize(),
			Stream.initialize(),
			Database.initialize({
				dialect: 'sqlite',
				logging: false,
				storage: './database.sqlite'
			})
		])
		.then(() => {
			Server.start();
			Stream.start();
		});
	}
}

const app = new App();

export default App;
