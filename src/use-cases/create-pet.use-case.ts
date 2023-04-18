import { AdoptionRequirementsRepository } from '@/repositories/adoption-requirements.repository'
import { PetGalleryRepository } from '@/repositories/pet-gallery.repository'
import { PetsRepository } from '@/repositories/pets.repository'
import {
  Age,
  Energy,
  Environment,
  Gender,
  Independence,
  Pet,
  Size,
  Type,
} from '@prisma/client'

export type CreatePetUseCaseInput = {
  name: string
  description: string
  city: string
  age: Age
  energy: Energy
  environment: Environment
  gender: Gender
  independence: Independence
  size: Size
  type: Type
  orgId: string

  adoptionRequirements: string[]
  petGallery: string[]
}

export type CreatePetUseCaseOutput = {
  pet: Pet
}

export class CreatePetUseCase {
  constructor(
    private readonly adoptionRequirementsRepository: AdoptionRequirementsRepository,
    private readonly petGalleryRepository: PetGalleryRepository,
    private readonly petsRepository: PetsRepository,
  ) {}

  async execute(pet: CreatePetUseCaseInput): Promise<CreatePetUseCaseOutput> {
    const { adoptionRequirements, petGallery, ...petProperties } = pet
    const createdPet = await this.petsRepository.create(petProperties)

    const petGalleryItems = petGallery.map((image) => ({
      petId: createdPet.id,
      image,
    }))

    await this.petGalleryRepository.createMany(petGalleryItems)

    const adoptionRequirementsItems = adoptionRequirements.map((title) => ({
      petId: createdPet.id,
      title,
    }))

    await this.adoptionRequirementsRepository.createMany(
      adoptionRequirementsItems,
    )

    return {
      pet: createdPet,
    }
  }
}
