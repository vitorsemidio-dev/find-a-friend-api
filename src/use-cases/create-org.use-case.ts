import { HashProvider } from '@/providers/hash.provider'
import { OrgsRepository } from '@/repositories/orgs.repository'
import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists.error'
import { Org, Prisma } from '@prisma/client'

type CreateOrgUseCaseInput = Prisma.OrgUncheckedCreateInput

type CreateOrgUseCaseOutput = {
  org: Org
}

export class CreateOrgUseCase {
  constructor(
    private readonly orgsRepository: OrgsRepository,
    private readonly hashProvider: HashProvider,
  ) {}

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

    const hashedPassword = await this.hashProvider.generateHash(password)

    const org = await this.orgsRepository.create({
      name,
      email,
      address,
      cep,
      whatsappNumber,
      password: hashedPassword,
    })

    return {
      org,
    }
  }
}
