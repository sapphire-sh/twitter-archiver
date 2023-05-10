import { promises as fsPromises } from 'fs';
import path from 'path';

export async function createDirectory(dirPath: string) {
  const targetPath = path.join(__path.data, dirPath);

  try {
    await fsPromises.lstat(targetPath);
  } catch (error) {
    switch ((error as any).code) {
      case 'ENOENT': {
        await fsPromises.mkdir(targetPath);
        break;
      }
      default: {
        throw error;
      }
    }
  }
}
