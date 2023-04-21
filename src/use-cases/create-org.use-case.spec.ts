import { OrgAlreadyExistsError } from './errors/org-already-exists.error'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs.repository'
import { makeOrgModel } from '@/test/factories/make-org-model'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from './create-org.use-case'

describe('CreateOrgUseCase', () => {
  let sut: CreateOrgUseCase
  let orgsRepository: InMemoryOrgsRepository

  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should create an org', async () => {
    const input = makeOrgModel()

    const { org } = await sut.execute(input)

    expect(org).toMatchObject({
      ...input,
      id: expect.any(String),
      createdAt: expect.any(Date),
      updatedAt: expect.any(Date),
    })
  })

  it('should not create an org with an existing email', async () => {
    const email = 'org-vitest@email.com'
    const input = makeOrgModel({ email })

    await sut.execute(input)

    const output = sut.execute(input)

    await expect(output).rejects.toBeInstanceOf(OrgAlreadyExistsError)
  })
})
