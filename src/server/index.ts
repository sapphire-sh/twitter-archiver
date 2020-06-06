import {
	Server,
} from './server';

import {
	Database,
	Downloader,
	OAuth,
	Socket,
	Twitter,
} from '~/server/libs';

const token = {
	'consumer_key': __env.CONSUMER_KEY,
	'consumer_secret': __env.CONSUMER_SECRET,
	'access_token': __env.ACCESS_TOKEN,
	'access_token_secret': __env.ACCESS_TOKEN_SECRET,
};

const port = __env.PORT === undefined ? 8015 : parseInt(__env.PORT!, 10);

const app = new Server(port);

(async () => {
	try {
		await Promise.all([
			Database.initialize(),
			// Downloader.initialize(),
			OAuth.initialize(token.consumer_key, token.consumer_secret),
			Socket.initialize(app.server),
			Twitter.initialize(token),
		]);
	}
	catch (error) {
		console.log('initialized failed');
		throw error;
	}

	try {
		await Promise.all([
			Database.start(),
			// Downloader.start(),
			Twitter.start(),
		]);
	}
	catch (error) {
		console.log('start failed');
		throw error;
	}
})();
