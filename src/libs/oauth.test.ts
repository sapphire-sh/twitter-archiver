import OAuth, {
	RequestToken,
	AccessToken,
} from './oauth';

jest.mock('../../__mocks__/oauth.js');

describe('./libs/oauth.ts', () => {
	beforeAll(() => {
		OAuth.initialize('consumer_key', 'consumer_secret');
	});

	test('get request token', (done) => {
		OAuth.getRequestToken().then((_: RequestToken) => {
			done();
		}).catch((err: Error) => {
			expect(err).toBeNull();
		});
	});

	test('get access token', (done) => {
		OAuth.getAccessToken({
			'oauth_verifier': '',
		}).then((_: AccessToken) => {
			done();
		}).catch((err: Error) => {
			expect(err).toBeNull();
		});
	});
});
