import { HashProvider } from '@/providers/hash.provider'
import { OrgsRepository } from '@/repositories/orgs.repository'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials.error'
import { Org } from '@prisma/client'

type AuthenticateUseCaseInput = {
  email: string
  password: string
}

type AuthenticateUseCaseOutput = {
  org: Org
}

export class AuthenticateUseCase {
  constructor(
    private readonly orgsRepository: OrgsRepository,
    private readonly hashProvider: HashProvider,
  ) {}
  async execute({
    email,
    password,
  }: AuthenticateUseCaseInput): Promise<AuthenticateUseCaseOutput> {
    const org = await this.orgsRepository.findByEmail(email)

    if (!org) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordMatch = await this.hashProvider.compareHash(
      password,
      org.password,
    )

    if (!doesPasswordMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      org,
    }
  }
}
