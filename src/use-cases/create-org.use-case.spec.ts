import { OrgAlreadyExistsError } from './errors/org-already-exists.error'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { makeOrgModel } from '@/test/factories/make-org-model'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from './create-org.use-case'
import { TestHashProvider } from '@/test/providers/test-hash.provider'

describe('CreateOrgUseCase', () => {
  let sut: CreateOrgUseCase
  let orgsRepository: InMemoryOrgsRepository
  let testHashProvider: TestHashProvider

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    testHashProvider = new TestHashProvider()
    sut = new CreateOrgUseCase(orgsRepository, testHashProvider)
  })

  it('should create an org', async () => {
    const input = makeOrgModel()

    const { org } = await sut.execute(input)

    expect(org).toMatchObject({
      ...input,
      id: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
      password: expect.any(String),
    })
  })

  it('should not create an org with an existing email', async () => {
    const email = 'org-vitest@email.com'
    const input = makeOrgModel({ email })

    await sut.execute(input)

    const output = sut.execute(input)

    await expect(output).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })

  it('should hash the password', async () => {
    const input = makeOrgModel({ password: 'org-vitest-password' })

    const { org } = await sut.execute(input)

    expect(org.password).not.toBe(input.password)
    await expect(
      testHashProvider.compareHash(input.password, org.password),
    ).resolves.toBe(true)
  })
})
