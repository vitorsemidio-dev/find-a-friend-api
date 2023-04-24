import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
  JWT_SECRET: z.string().nonempty(),
  PORT: z.coerce.number().default(3333),
  SUPABASE_ANON_KEY: z.string().nonempty(),
  SUPABASE_BUCKET_URL: z.string().nonempty(),
  SUPABASE_SERVICE_ROLE: z.string().nonempty(),
  SUPABASE_URL: z.string().nonempty(),
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
})

const _env = envSchema.safeParse(process.env)

if (!_env.success) {
  console.error(_env.error.format())
  throw new Error('Invalid environment variables')
}

const env = _env.data

export { env }
