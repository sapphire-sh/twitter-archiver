import cookieSession from 'cookie-session';
import express from 'express';
import Twit from 'twit';
import { DatabaseService, OAuthService, SocketService, TwitterService } from '../services';
import { mainRouter } from './routers';

const app = express();

app.use(
	cookieSession({
		name: 'session',
		secret: process.env.NODE_ENV === 'test' ? 'test' : process.env.CONSUMER_KEY,
		maxAge: 7 * 24 * 3600 * 1000,
	})
);

app.use(mainRouter);

const main = async () => {
	const token: Twit.ConfigKeys = {
		consumer_key: process.env.CONSUMER_KEY ?? '',
		consumer_secret: process.env.CONSUMER_SECRET ?? '',
		access_token: process.env.ACCESS_TOKEN ?? '',
		access_token_secret: process.env.ACCESS_TOKEN_SECRET ?? '',
	};

	try {
		const promises = [
			DatabaseService.initialize(),
			OAuthService.initialize(token.consumer_key, token.consumer_secret),
			// SocketService.initialize(server),
			TwitterService.initialize(token),
		];
		await Promise.all(promises);
	} catch (error) {
		console.log('initialization failed');
		throw error;
	}

	try {
		const promises = [
			DatabaseService.start(),
			// TwitterService.start()
		];
		await Promise.all(promises);
	} catch (error) {
		console.log('start failed');
		throw error;
	}
};

main();

export default app;

// Start standalone server if directly running
if (require.main === module) {
	const port = process.env.PORT ?? 3001;
	app.listen(port, () => {
		// eslint-disable-next-line no-console
		console.log(`API server listening on port ${port}`);
	});
}
