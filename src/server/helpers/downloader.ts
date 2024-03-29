import fs from 'fs';
import path from 'path';
import { createDirectory } from '~/server/helpers';
import { Entities, Tweet } from '~/shared/models';

export async function downloadMedia(tweet: Tweet) {
  const { user } = tweet;

  const entities: Entities | undefined = (tweet as any).extended_entities;

  if (entities === undefined) {
    return;
  }

  await createDirectory(user.id_str);

  const urls = entities.media.map((medium) => {
    return medium.media_url_https;
  });

  for (const url of urls) {
    await download(user.id_str, url);
  }
}

async function checkFile(id: string, name: string): Promise<boolean> {
  const targetPath = path.join(__path.data, id, name);

  try {
    await fs.promises.lstat(targetPath);
    return true;
  } catch (error) {
    switch ((error as any).code) {
      case 'ENOENT': {
        return false;
      }
      default: {
        throw error;
      }
    }
  }
}

async function download(id: string, url: string) {
  const name = url.split('/').pop()!;
  const filePath = path.resolve(__path.data, id, name);

  const exists = await checkFile(id, name);
  if (exists === false) {
    return new Promise((resolve, reject) => {
      const stream = fs.createWriteStream(filePath);
      // FIXME: downloader
      // request(`${url}:orig`).on('error', reject).on('close', resolve).pipe(stream);
    });
  }
}
