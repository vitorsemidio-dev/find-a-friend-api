import { prisma } from '@/lib/prisma'
import { AdoptionRequirementsRepository } from '@/repositories/adoption-requirements.repository'
import { Prisma } from '@prisma/client'

export class PrismaAdoptionRequirementsRepository
  implements AdoptionRequirementsRepository
{
  async createMany(data: Prisma.AdoptionRequirementsUncheckedCreateInput[]) {
    const promises = data.map((requirement) =>
      prisma.adoptionRequirements.create({
        data: requirement,
      }),
    )
    const adoptionRequirements = await Promise.all(promises)

    return adoptionRequirements
  }
}
