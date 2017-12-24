import {
	OAuth as _OAuth,
} from 'oauth';

class OAuth {
	static oauth_token;
	static oauth_token_secret;

	static initialize() {
		let self = this;

		const {
			consumer_key,
			consumer_secret,
		} = process.env;

		self.oauth = new _OAuth(
			'https://api.twitter.com/oauth/request_token',
			'https://api.twitter.com/oauth/access_token',
			consumer_key,
			consumer_secret,
			'1.0A',
			null,
			'HMAC-SHA1',
		);
	}

	static getRequestToken() {
		let self = this;

		return new Promise((resolve, reject) => {
			self.oauth.getOAuthRequestToken((err, oauth_token, oauth_token_secret) => {
				/* istanbul ignore if */
				if(err) {
					reject(err);
				}
				else {
					self.oauth_token = oauth_token;
					self.oauth_token_secret = oauth_token_secret;

					resolve({
						'oauth_token': oauth_token,
						'oauth_token_secret': oauth_token_secret,
					});
				}
			});
		});
	}

	static getAccessToken(token) {
		let self = this;

		const oauth_verifier = token.oauth_verifier;

		return new Promise((resolve, reject) => {
			self.oauth.getOAuthAccessToken(self.oauth_token, self.oauth_token_secret, oauth_verifier, (err, access_token, access_token_secret) => {
				/* istanbul ignore if */
				if(err) {
					reject(err);
				}
				else {
					resolve({
						'access_token': access_token,
						'access_token_secret': access_token_secret,
					});
				}
			});
		});
	}
}

export default OAuth;
