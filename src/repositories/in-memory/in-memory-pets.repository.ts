import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets.repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  private pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      ...data,
      id: randomUUID() || data.id,
    } as Pet

    this.pets.push(pet)

    return pet
  }
}
