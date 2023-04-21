import { FindManyParams, PetsRepository } from '@/repositories/pets.repository'
import { Pet, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  private pets: Pet[] = []

  async create(data: Prisma.PetUncheckedCreateInput): Promise<Pet> {
    const pet = {
      ...data,
      id: data.id || randomUUID(),
    } as Pet

    this.pets.push(pet)

    return pet
  }

  async findById(id: string): Promise<Pet | null> {
    return this.pets.find((pet) => pet.id === id) || null
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
