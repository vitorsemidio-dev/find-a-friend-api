import { BCryptHashProvider } from '@/providers/implementations/bcryptjs-hash.provider'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate.use-case'

export function makeAuthenticateUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const hashProvider = new BCryptHashProvider()
  const authenticateUseCase = new AuthenticateUseCase(
    orgsRepository,
    hashProvider,
  )
  return authenticateUseCase
}
