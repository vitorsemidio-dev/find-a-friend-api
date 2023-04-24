import { prisma } from '@/lib/prisma'
import { FindManyParams, PetsRepository } from '@/repositories/pets.repository'
import { Prisma } from '@prisma/client'

export class PrismaPetsRepository implements PetsRepository {
  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = prisma.pet.create({
      data,
    })
    return pet
  }

  async findById(id: string) {
    const pet = prisma.pet.findUnique({
      where: { id },
      include: {
        adoptionRequirements: true,
        petGallery: true,
        org: {
          select: {
            address: true,
            cep: true,
            email: true,
            id: true,
            name: true,
            whatsappNumber: true,
          },
        },
      },
    })
    return pet
  }

  async findMany(params: FindManyParams) {
    const pets = prisma.pet.findMany({
      where: params,
    })
    return pets
  }
}
