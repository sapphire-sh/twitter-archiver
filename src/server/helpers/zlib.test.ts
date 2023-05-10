import { deflate, inflate } from './zlib';

describe('./utils/zlib.ts', () => {
  const original = 'sapphire';
  const deflated = Buffer.from('eJxTKk4sKMjILEpVAgAUDwOh', 'base64');

  test('deflate', async () => {
    const res = await deflate(original);
    expect(res).toEqual(deflated);
  });

  test('valid inflate', async () => {
    const res = await inflate(deflated);
    expect(res).toBe(original);
  });

  test('invalid inflate', async () => {
    await expect(inflate(Buffer.from(original))).rejects.toThrowError();
  });
});
