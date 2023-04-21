import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found.error'
import { GetPetDetailUseCase } from '@/use-cases/get-pet-detail.use-case'
import { makePetModel } from '@/use-cases/test/factories/make-pet-model'
import { beforeEach, describe, expect, it } from 'vitest'

describe('GetPetDetailUseCase', () => {
  let sut: GetPetDetailUseCase
  let petsRepository: InMemoryPetsRepository

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()
    sut = new GetPetDetailUseCase(petsRepository)
  })

  it('should return a pet when found', async () => {
    const petCreated = await petsRepository.create(
      makePetModel({
        name: 'Rex',
      }),
    )

    const { pet } = await sut.execute({ petId: petCreated.id })

    expect(pet).toMatchObject({
      ...petCreated,
    })
  })

  it('should throw error when not found pet', async () => {
    const petId = 'id-not-found'

    const output = sut.execute({ petId })

    await expect(output).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
