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

export type ListPetsByCityUseCaseInput = {
  city: string
  age?: Age
  energy?: Energy
  environment?: Environment
  gender?: Gender
  independence?: Independence
  size?: Size
  type?: Type
}

export type ListPetsByCityUseCaseOutput = {
  pets: Pet[]
}

export class ListPetsByCityUseCase {
  constructor(private readonly petsRepository: PetsRepository) {}

  async execute(
    pet: ListPetsByCityUseCaseInput,
  ): Promise<ListPetsByCityUseCaseOutput> {
    const pets = await this.petsRepository.findMany({
      age: pet.age,
      city: pet.city,
      energy: pet.energy,
      environment: pet.environment,
      gender: pet.gender,
      independence: pet.independence,
      size: pet.size,
      type: pet.type,
    })
    return {
      pets: pets,
    }
  }
}
