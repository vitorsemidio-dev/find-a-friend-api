import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets.repository'
import { ListPetsByCityUseCase } from '../list-pets-by-city.use-case'

export function makeListPetsByCityUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const authenticateUseCase = new ListPetsByCityUseCase(petsRepository)
  return authenticateUseCase
}
