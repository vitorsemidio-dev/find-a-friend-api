import { Prisma, PetGallery } from '@prisma/client'
import { PetGalleryRepository } from '../pet-gallery.repository'
import { randomUUID } from 'crypto'

export class InMemoryPetGalleryRepository implements PetGalleryRepository {
  private petGallery: PetGallery[] = []

  async create(
    data: Prisma.PetGalleryUncheckedCreateInput,
  ): Promise<PetGallery> {
    const petGallery = {
      ...data,
      id: randomUUID() || data.id,
    } as PetGallery

    this.petGallery.push(petGallery)

    return petGallery
  }

  async createMany(
    data: Prisma.PetGalleryUncheckedCreateInput[],
  ): Promise<PetGallery[]> {
    const petGallery = data.map((item) => ({
      ...item,
      id: randomUUID(),
    })) as PetGallery[]

    this.petGallery.push(...petGallery)

    return petGallery
  }
}
