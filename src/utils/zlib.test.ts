import {
	deflate,
	inflate,
} from './zlib';

describe('./utils/zlib.js', () => {
	const original = 'sapphire';
	const deflated = 'eJxTKk4sKMjILEpVAgAUDwOh';

	test('deflate', () => {
		return expect(deflate(original)).resolves.toEqual(deflated);
	});

	test('valid inflate', () => {
		return expect(inflate(deflated)).resolves.toEqual(original);
	});

	test('invalid inflate', () => {
		return expect(inflate(original)).rejects.toThrow('a');
	});
});
