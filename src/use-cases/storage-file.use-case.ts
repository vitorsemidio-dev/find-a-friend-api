import { MulterFile } from '@/@types/multer-file.type'
import { env } from '@/env'
import { DiskStorageFileStrategy } from '@/providers/implementations/disk-storage-file.provider'
import { SupabaseStorageFileStrategy } from '@/providers/implementations/supabase-storage-file.provider'
import { StorageFileProvider } from '@/providers/storage-file.provider'

export class StorageFileUseCase implements StorageFileProvider {
  private storageFileStrategy: StorageFileProvider
  constructor() {
    this.storageFileStrategy = this.getStorageFileStrategy()
  }

  async execute(files: MulterFile[]) {
    const { paths } = await this.storageFileStrategy.execute(files)

    return {
      paths,
    }
  }

  getStorageFileStrategy(): StorageFileProvider {
    return env.NODE_ENV === 'test'
      ? new DiskStorageFileStrategy()
      : new SupabaseStorageFileStrategy()
  }
}
