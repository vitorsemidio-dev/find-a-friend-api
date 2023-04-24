import fs from 'node:fs/promises'
import { StorageFileProvider } from '../storage-file.provider'
import { MulterFile } from '@/@types/multer-file.type'

export class DiskStorageFileStrategy implements StorageFileProvider {
  async execute(files: MulterFile[]) {
    const images = files

    const paths = []

    for (const image of images) {
      const newPath = image.path.replace('tmp', 'uploads')
      await fs.rename(image.path, newPath)
      paths.push(newPath)
    }

    return {
      paths,
    }
  }
}
