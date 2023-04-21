import { HashProvider } from '@/providers/hash.provider'
import { compare, hash } from 'bcryptjs'

export class BCryptHashProvider implements HashProvider {
  async generateHash(payload: string): Promise<string> {
    return hash(payload, 8)
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return compare(payload, hashed)
  }
}
