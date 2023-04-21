import { AdoptionRequirementsRepository } from '@/repositories/adoption-requirements.repository'
import { AdoptionRequirements, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

export class InMemoryAdoptionRequirementsRepository
  implements AdoptionRequirementsRepository
{
  private adoptionRequirements: AdoptionRequirements[] = []

  async createMany(
    data: Prisma.AdoptionRequirementsUncheckedCreateInput[],
  ): Promise<AdoptionRequirements[]> {
    const adoptionRequirements = data.map((adoptionRequirement) => ({
      ...adoptionRequirement,
      id: adoptionRequirement.id || randomUUID(),
    }))

    this.adoptionRequirements.push(...adoptionRequirements)

    return adoptionRequirements
  }
}
