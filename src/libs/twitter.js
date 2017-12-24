import Promise from 'bluebird';

import Twit from 'twit';

class Twitter {
	static isInitialized;

	static initialize(token) {
		let self = this;

		self.twit = new Twit(token);

		self.isInitialized = true;
	}

	static _request(type, url, params) {
		let self = this;

		if(self.isInitialized === false) {
			return Promise.reject('twit is not initialized');
		}

		if(params === undefined) {
			params = {};
		}

		let fn;
		switch(type) {
		case 'get':
			fn = self.twit.get;
			break;
		case 'post':
			fn = self.twit.post;
			break;
		default:
			return Promise.reject('invalid request type');
		}

		return new Promise((resolve, reject) => {
			fn(url, params, (err, res) => {
				if(err) {
					reject(err);
				}
				else {
					resolve(res);
				}
			});
		});
	}

	static get(url, params) {
		let self = this;

		return self._request('get', url, params);
	}

	static post(url, params) {
		let self = this;

		return self._request('post', url, params);
	}

	static getCurrentUser() {
		let self = this;

		return self.get('account/verify_credentials');
	}
}

export default Twitter;
