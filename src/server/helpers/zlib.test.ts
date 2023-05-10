import { deflate, inflate } from './zlib';

describe('./utils/zlib.ts', () => {
  const original = 'sapphire';
  const deflated = Buffer.from('eJxTKk4sKMjILEpVAgAUDwOh', 'base64');

  it('deflate', async () => {
    const res = await deflate(original);
    expect(res).toEqual(deflated);
  });

  it('valid inflate', async () => {
    const res = await inflate(deflated);
    expect(res).toBe(original);
  });

  it('invalid inflate', async () => {
    await expect(inflate(Buffer.from(original))).rejects.toThrowError();
  });
});
