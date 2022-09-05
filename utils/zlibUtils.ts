import util from 'util';
import zlib from 'zlib';

const deflateAsync = util.promisify(zlib.deflate);
const inflateAsync = util.promisify(zlib.inflate);

export const deflate = async <T>(data: T) => {
	const jsonStr = JSON.stringify(data);
	const buffer = Buffer.from(jsonStr);
	return await deflateAsync(buffer);
};

export const inflate = async <T>(data: Buffer): Promise<T> => {
	const result = await inflateAsync(data);
	return JSON.parse(result.toString());
};
