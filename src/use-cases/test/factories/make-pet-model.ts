import { CreatePetUseCaseInput } from '@/use-cases/create-pet.use-case'
import {
  Age,
  Energy,
  Environment,
  Gender,
  Independence,
  Pet,
  Prisma,
  Size,
  Type,
} from '@prisma/client'

export const makePetModel = (
  override: Partial<Prisma.PetUncheckedCreateInput> = {},
): Prisma.PetUncheckedCreateInput => {
  return {
    name: 'Bobby',
    description: 'A cute dog',
    city: 'São Paulo',
    age: Age.adult,
    energy: Energy.high,
    environment: Environment.indoor,
    gender: Gender.female,
    independence: Independence.high,
    size: Size.medium,
    type: Type.dog,
    orgId: 'org-id',
    ...override,
  }
}
