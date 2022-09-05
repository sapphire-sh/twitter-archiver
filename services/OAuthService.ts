import { OAuth } from 'oauth';

export interface RequestToken {
	oauth_token: string;
	oauth_token_secret: string;
}

export interface AccessToken {
	access_token: string;
	access_token_secret: string;
}

export class OAuthService {
	private static oauth_token: string;
	private static oauth_token_secret: string;

	private static oauth: OAuth;

	public static initialize(consumer_key: string, consumer_secret: string) {
		this.oauth = new OAuth(
			'https://api.twitter.com/oauth/request_token',
			'https://api.twitter.com/oauth/access_token',
			consumer_key,
			consumer_secret,
			'1.0A',
			null,
			'HMAC-SHA1'
		);
	}

	public static getRequestToken(): Promise<RequestToken> {
		return new Promise((resolve, reject) => {
			this.oauth.getOAuthRequestToken((error, oauth_token, oauth_token_secret) => {
				if (error) {
					reject(error);
				} else {
					this.oauth_token = oauth_token;
					this.oauth_token_secret = oauth_token_secret;

					resolve({
						oauth_token: oauth_token,
						oauth_token_secret: oauth_token_secret,
					});
				}
			});
		});
	}

	public static getAccessToken(token: { oauth_verifier: string }): Promise<AccessToken> {
		const oauth_verifier = token.oauth_verifier;

		return new Promise((resolve, reject) => {
			this.oauth.getOAuthAccessToken(
				this.oauth_token,
				this.oauth_token_secret,
				oauth_verifier,
				(error, access_token, access_token_secret) => {
					if (error) {
						reject(error);
					} else {
						resolve({
							access_token: access_token,
							access_token_secret: access_token_secret,
						});
					}
				}
			);
		});
	}
}
