import zlib from 'zlib';

import Promise from 'bluebird';

export function deflate(data) {
	const jsonStr = JSON.stringify(data);
	const buffer = new Buffer(jsonStr);

	return new Promise((resolve, reject) => {
		zlib.deflate(buffer, (err, result) => {
			/* istanbul ignore if */
			if(err) {
				reject(err);
			}
			else {
				resolve(result.toString('base64'));
			}
		});
	});
}

export function inflate(data) {
	const buffer = new Buffer(data, 'base64');

	return new Promise((resolve, reject) => {
		zlib.inflate(buffer, (err, result) => {
			if(err) {
				reject(err);
			}
			else {
				resolve(JSON.parse(result));
			}
		});
	});
}

export default {
	'deflate': deflate,
	'inflate': inflate,
};
