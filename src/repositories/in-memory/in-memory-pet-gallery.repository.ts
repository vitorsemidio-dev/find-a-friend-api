import { PetGalleryRepository } from '@/repositories/pet-gallery.repository'
import { PetGallery, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

export class InMemoryPetGalleryRepository implements PetGalleryRepository {
  private petGallery: PetGallery[] = []

  async create(
    data: Prisma.PetGalleryUncheckedCreateInput,
  ): Promise<PetGallery> {
    const petGallery = {
      ...data,
      id: data.id || randomUUID(),
    } as PetGallery

    this.petGallery.push(petGallery)

    return petGallery
  }

  async createMany(
    data: Prisma.PetGalleryUncheckedCreateInput[],
  ): Promise<PetGallery[]> {
    const petGallery = data.map((item) => ({
      ...item,
      id: item.id || randomUUID(),
    })) as PetGallery[]

    this.petGallery.push(...petGallery)

    return petGallery
  }
}
