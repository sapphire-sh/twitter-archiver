import {
	expect,
} from 'chai';

import {
	deflate,
	inflate,
} from './zlib';

describe('./utils/zlib.ts', () => {
	const original = 'sapphire';
	const deflated = Buffer.from('eJxTKk4sKMjILEpVAgAUDwOh', 'base64');

	it('deflate', () => {
		return deflate(original).then((res) => {
			expect(res).to.deep.equal(deflated);
		});
	});

	it('valid inflate', () => {
		return inflate(deflated).then((res) => {
			expect(res).to.deep.equal(original);
		});
	});

	// it('invalid inflate', () => {
	// 	return inflate(Buffer.from(original)).then(() => {
	// 		expect(true).to.be.false;
	// 	}).catch(() => {});
	// });
});
