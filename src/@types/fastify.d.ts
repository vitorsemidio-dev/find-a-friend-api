import { MulterFile } from '@/types/multer-file.type'
import 'fastify'

declare module 'fastify' {
  export interface FastifyRequest {
    files: MulterFile[]
  }
}
