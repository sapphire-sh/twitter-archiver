import zlib from 'zlib';

export function deflate<T>(data: T) {
  const jsonStr = JSON.stringify(data);
  const buffer = Buffer.from(jsonStr);

  return new Promise((resolve, reject) => {
    zlib.deflate(buffer, (err, result) => {
      /* istanbul ignore if */
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}

export function inflate<T>(data: Buffer): Promise<T> {
  return new Promise((resolve, reject) => {
    zlib.inflate(data, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(result.toString()));
      }
    });
  });
}
