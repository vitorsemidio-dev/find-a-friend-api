import { Pet, Prisma } from '@prisma/client'
import { FindManyParams, PetsRepository } from '../pets.repository'
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

  async findMany(params: FindManyParams): Promise<Pet[]> {
    return this.pets.filter((pet) => {
      return Object.entries(params)
        .filter(([key, value]) => value)
        .every(([key, value]) => {
          const _key = key as keyof Pet
          return pet[_key] === value
        })
    })
  }
}
