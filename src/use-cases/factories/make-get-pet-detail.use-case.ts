import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets.repository'
import { GetPetDetailUseCase } from '@/use-cases/get-pet-detail.use-case'

export function makeGetPetDetailUseCase() {
  const prismaPetsrepository = new PrismaPetsRepository()
  const getPetDetailUseCase = new GetPetDetailUseCase(prismaPetsrepository)
  return getPetDetailUseCase
}
