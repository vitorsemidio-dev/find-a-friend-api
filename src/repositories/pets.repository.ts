import { Pet, Prisma } from '@prisma/client'

export type FindManyParams = Partial<
  Pick<
    Pet,
    | 'age'
    | 'city'
    | 'energy'
    | 'environment'
    | 'gender'
    | 'independence'
    | 'size'
    | 'type'
  >
>

export interface PetsRepository {
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
  findById(id: string): Promise<Pet | null>
  findMany(params: FindManyParams): Promise<Pet[]>
}
