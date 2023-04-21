import { InMemoryAdoptionRequirementsRepository } from '@/repositories/in-memory/in-memory-adoption-requirements.repository'
import { InMemoryPetGalleryRepository } from '@/repositories/in-memory/in-memory-pet-gallery.repository'
import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import {
  CreatePetUseCase,
  CreatePetUseCaseInput,
} from '@/use-cases/create-pet.use-case'
import {
  Age,
  Energy,
  Environment,
  Gender,
  Independence,
  Size,
  Type,
} from '@prisma/client'
import { beforeEach, describe, expect, it } from 'vitest'

const makeSutInput = (
  override: Partial<CreatePetUseCaseInput> = {},
): CreatePetUseCaseInput => {
  return {
    name: 'Bobby',
    description: 'A cute dog',
    city: 'São Paulo',
    age: Age.adult,
    energy: Energy.high,
    environment: Environment.indoor,
    gender: Gender.female,
    independence: Independence.high,
    size: Size.medium,
    type: Type.dog,
    adoptionRequirements: ['A home with a yard'],
    petGallery: ['https://example.com/image.jpg'],
    orgId: 'org-id',
    ...override,
  }
}

describe('CreatePetUseCase', () => {
  let sut: CreatePetUseCase
  let adoptionRequirementsRepository: InMemoryAdoptionRequirementsRepository
  let petGalleryRepository: InMemoryPetGalleryRepository
  let petsRepository: InMemoryPetsRepository

  beforeEach(() => {
    adoptionRequirementsRepository =
      new InMemoryAdoptionRequirementsRepository()
    petGalleryRepository = new InMemoryPetGalleryRepository()
    petsRepository = new InMemoryPetsRepository()

    sut = new CreatePetUseCase(
      adoptionRequirementsRepository,
      petGalleryRepository,
      petsRepository,
    )
  })
  it('should create a pet with all properties set correctly', async () => {
    const input = makeSutInput()

    const { pet } = await sut.execute(input)

    const { adoptionRequirements, petGallery, ...rest } = input
    const expected = {
      id: expect.any(String),
      ...rest,
    }
    expect(pet).toMatchObject(expected)
  })
})
