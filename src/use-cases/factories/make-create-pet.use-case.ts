import { PrismaAdoptionRequirementsRepository } from '@/repositories/prisma/prisma-adoption-requirements.repository'
import { PrismaPetGalleryRepository } from '@/repositories/prisma/prisma-pet-gallery.repository'
import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets.repository'
import { CreatePetUseCase } from '@/use-cases/create-pet.use-case'

export function makeCreatePetUseCase() {
  const adoptionRequirementsRepository =
    new PrismaAdoptionRequirementsRepository()
  const petGalleryRepository = new PrismaPetGalleryRepository()
  const petsRepository = new PrismaPetsRepository()

  return new CreatePetUseCase(
    adoptionRequirementsRepository,
    petGalleryRepository,
    petsRepository,
  )
}
