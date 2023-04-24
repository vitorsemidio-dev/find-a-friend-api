import { MulterFile } from '@/@types/multer-file.type'
import { env } from '@/env'
import { supabase } from '@/lib/supabase'
import { StorageFileProvider } from '@/providers/storage-file.provider'
import fs from 'node:fs/promises'

export class SupabaseStorageFileStrategy implements StorageFileProvider {
  async execute(files: MulterFile[]) {
    const images = files

    const promises = images.map(async (image) => {
      const stream = await fs.readFile(image.path)
      const response = await supabase.storage
        .from(env.SUPABASE_BUCKET_URL)
        .upload(`${image.filename}`, stream, {
          contentType: image.mimetype,
        })

      return response
    })

    const filesUploaded = await Promise.all(promises)
    const paths = filesUploaded
      .filter((file) => file.data)
      .map((file) => file.data?.path)
    return {
      filesUploaded,
      paths,
    }
  }
}
