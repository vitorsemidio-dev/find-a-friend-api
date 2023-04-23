import { StorageFileUseCase } from '@/use-cases/storage-file.use-case'

export function makeStorageFileUseCase() {
  return new StorageFileUseCase()
}
