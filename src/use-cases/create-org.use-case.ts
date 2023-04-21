import { OrgsRepository } from '@/repositories/orgs.repository'
import { Prisma, Org } from '@prisma/client'

type CreateOrgUseCaseInput = Prisma.OrgUncheckedCreateInput

type CreateOrgUseCaseOutput = {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private readonly orgsRepository: OrgsRepository) {}

  async execute({
    name,
    email,
    address,
    cep,
    whatsappNumber,
    password,
  }: CreateOrgUseCaseInput): Promise<CreateOrgUseCaseOutput> {
    const org = await this.orgsRepository.create({
      name,
      email,
      address,
      cep,
      whatsappNumber,
      password,
    })

    return {
      org,
    }
  }
}
