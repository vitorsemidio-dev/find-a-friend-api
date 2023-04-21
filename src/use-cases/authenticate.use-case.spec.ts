import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate.use-case'
import { TestHashProvider } from '@/test/providers/test-hash.provider'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'

describe('AuthenticateUseCase', () => {
  let sut: AuthenticateUseCase
  let hashProvider: TestHashProvider
  let orgsRepository: InMemoryOrgsRepository

  beforeEach(() => {
    hashProvider = new TestHashProvider()
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository, hashProvider)
  })

  it('should throw InvalidCredentialsError if org does not exist', async () => {
    const input = {
      email: 'non-existing-org@email.com',
      password: '123456',
    }

    const promise = sut.execute(input)

    await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
