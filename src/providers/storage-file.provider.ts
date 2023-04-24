import { MulterFile } from '@/@types/multer-file.type'

export interface StorageFileProvider {
  execute(files: MulterFile[]): Promise<any>
}
