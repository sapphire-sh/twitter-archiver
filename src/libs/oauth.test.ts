// import {
// 	expect,
// } from 'chai';

import {
	OAuth,
	// RequestToken,
	// AccessToken,
} from './oauth';

describe('./libs/oauth.ts', () => {
	beforeEach(() => {
		OAuth.initialize('consumer_key', 'consumer_secret');
	});

	it('get request token', (done) => {
		done();
		// OAuth.getRequestToken().then((_: RequestToken) => {
		// 	done();
		// }).catch((err: Error) => {
		// 	expect(err).to.be.null;
		// 	done();
		// });
	});

	it('get access token', (done) => {
		done();
		// OAuth.getAccessToken({
		// 	'oauth_verifier': '',
		// }).then((_: AccessToken) => {
		// 	done();
		// }).catch((err: Error) => {
		// 	expect(err).to.be.null;
		// 	done();
		// });
	});
});
