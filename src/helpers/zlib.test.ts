import {
	expect,
} from 'chai';

import {
	deflate,
	inflate,
} from './zlib';

describe('./utils/zlib.ts', () => {
	const original = 'sapphire';
	const deflated = 'eJxTKk4sKMjILEpVAgAUDwOh';

	it('deflate', () => {
		return deflate(original).then((res) => {
			expect(res).to.equal(deflated);
		});
	});

	it('valid inflate', () => {
		return inflate(deflated).then((res) => {
			expect(res).to.equal(original);
		});
	});

	it('invalid inflate', () => {
		return inflate(original).then(() => {
			expect(true).to.be.false;
		}).catch(() => {});
	});
});
