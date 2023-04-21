import { HashProvider } from '@/providers/hash.provider'
import { OrgsRepository } from '@/repositories/orgs.repository'
import { InvalidCredentialsError } from './errors/invalid-credentials.error'

type AuthenticateUseCaseInput = {
  email: string
  password: string
}

type AuthenticateUseCaseOutput = {}

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

    return {}
  }
}
