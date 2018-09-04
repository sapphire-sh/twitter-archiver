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

	it('deflate', async () => {
		const res = await deflate(original);
		expect(res).to.deep.equal(deflated);
	});

	it('valid inflate', async () => {
		const res = await inflate(deflated);
		expect(res).to.deep.equal(original);
	});

	it('invalid inflate', async () => {
		try {
			await inflate(Buffer.from(original));
			// tslint:disable:no-unused-expression
			expect(true).to.be.false;
		}
		catch(err) {
			// tslint:disable:no-unused-expression
			expect(true).to.be.true;
		}
	});
});
