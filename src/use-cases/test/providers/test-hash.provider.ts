import { HashProvider } from '@/providers/hash.provider'

export class TestHashProvider implements HashProvider {
  async generateHash(payload: string): Promise<string> {
    return Promise.resolve(`hashed_${payload}`)
  }

  async compareHash(payload: string, hashed: string): Promise<boolean> {
    return Promise.resolve(`hashed_${payload}` === hashed)
  }
}
