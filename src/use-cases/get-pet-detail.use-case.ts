import { PetsRepository } from '@/repositories/pets.repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found.error'

export type GetPetDetailUseCaseInput = {
  petId: string
}

export type GetPetDetailUseCaseOutput = {
  pet: Pet
}

export class GetPetDetailUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute({
    petId,
  }: GetPetDetailUseCaseInput): Promise<GetPetDetailUseCaseOutput> {
    const pet = await this.petsRepository.findById(petId)

    if (!pet) {
      throw new ResourceNotFoundError()
    }

    return {
      pet,
    }
  }
}
