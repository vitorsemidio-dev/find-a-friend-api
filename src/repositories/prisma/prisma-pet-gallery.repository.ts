import { prisma } from '@/lib/prisma'
import { PetGalleryRepository } from '@/repositories/pet-gallery.repository'
import { Prisma } from '@prisma/client'

export class PrismaPetGalleryRepository implements PetGalleryRepository {
  async createMany(data: Prisma.PetGalleryUncheckedCreateInput[]) {
    const promises = data.map((petGallery) =>
      prisma.petGallery.create({
        data: petGallery,
      }),
    )
    const petGallery = await Promise.all(promises)
    return petGallery
  }

  async create(data: Prisma.PetGalleryUncheckedCreateInput) {
    const petGallery = await prisma.petGallery.create({
      data,
    })
    return petGallery
  }
}
