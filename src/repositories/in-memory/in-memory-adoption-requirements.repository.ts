import { AdoptionRequirements, Prisma } from '@prisma/client'
import { AdoptionRequirementsRepository } from '../adoption-requirements.repository'
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
      id: randomUUID() || adoptionRequirement.id,
    }))

    this.adoptionRequirements.push(...adoptionRequirements)

    return adoptionRequirements
  }
}
