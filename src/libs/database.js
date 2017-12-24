import Promise from 'bluebird';
import _redis from 'redis';

import zlib from '../utils/zlib';

const redis = _redis.createClient();

redis.on('error', (err) => {
	console.log(`redis-error: ${err}`);
});

class Database {
	static client() {
		return redis;
	}

	static _set(type, key, value, expire) {
		let self = this;

		let args = [
			key,
			value,
		];

		if(expire !== undefined) {
			args.concat([
				'EX',
				expire,
			]);
		}

		let fn;
		switch(type) {
		case 'set':
			fn = redis.set;
			break;
		case 'hset':
			fn = redis.hset;
			break;
		default:
			return Promise.reject('invalid query type');
		}

		return new Promise((resolve, reject) => {
			fn(...args, (err, reply) => {
				if(err) {
					reject(err);
				}
				else {
					resolve(reply);
				}
			});
		});
	}

	static _get(type, key) {
		let self = this;

		let fn;
		switch(type) {
		case 'get':
			fn = redis.get;
			break;
		case 'hget':
			fn = redis.hget;
			break;
		default:
			return Promise.reject('invalid query type');
		}

		return new Promise((resolve, reject) => {
			redis.get(key, (err, reply) => {
				if(err) {
					reject(err);
				}
				else {
					resolve(reply);
				}
			});
		});
	}

	static set(key, value, expire) {
		let self = this;

		return self._set('set', key, value, expire);
	}

	static hset(key, value, expire) {
		let self = this;

		return self._set('hset', key, value, expire);
	}

	static get(key) {
		let self = this;

		return self._get('get', key);
	}

	static hget(key) {
		let self = this;

		return self._get('hset', key);
	}

	static setOAuthToken(token) {
		let self = this;

		return zlib.deflate(token).then((data) => {
			return self.set('oauth', data.toString('base64'));
		});
	}

	static getOAuthToken() {
		let self = this;

		return self.get('oauth').then((data) => {
			return zlib.inflate(new Buffer(data, 'base64'));
		});
	}
}

export default Database;
