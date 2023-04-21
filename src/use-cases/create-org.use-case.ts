import { OrgsRepository } from '@/repositories/orgs.repository'
import { Org, Prisma } from '@prisma/client'
import { OrgAlreadyExistsError } from './errors/org-already-exists.error'

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
    const orgExists = await this.orgsRepository.findByEmail(email)

    if (orgExists) {
      throw new OrgAlreadyExistsError()
    }

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
