import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { makeOrgModel } from '@/test/factories/make-org-model'
import { TestHashProvider } from '@/test/providers/test-hash.provider'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate.use-case'
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

  it('should return org if credentials are valid', async () => {
    const input = makeOrgModel({
      email: 'org-email@email.com',
      password: '123456',
    })

    const orgCreated = await orgsRepository.create(
      makeOrgModel({
        email: input.email,
        password: await hashProvider.generateHash(input.password),
      }),
    )

    const output = await sut.execute(input)

    expect(output.org).toMatchObject({
      id: orgCreated.id,
      email: input.email,
    })
  })

  it('should throw InvalidCredentialsError if org does not exist', async () => {
    const input = {
      email: 'non-existing-org@email.com',
      password: '123456',
    }

    const promise = sut.execute(input)

    await expect(promise).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should throw InvalidCredentialsError if password does not match', async () => {
    const email = 'correct-org@email.com'
    const password = 'correct-password'
    const incorrectPassword = 'incorrect-password'
    await orgsRepository.create(
      makeOrgModel({
        email,
        password: await hashProvider.generateHash(password),
      }),
    )

    const output = sut.execute({
      email,
      password: incorrectPassword,
    })

    await expect(output).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
