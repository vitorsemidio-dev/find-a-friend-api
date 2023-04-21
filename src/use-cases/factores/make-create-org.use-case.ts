import { BCryptHashProvider } from '@/providers/implementations/bcryptjs-hash.provider'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs.repository'
import { CreateOrgUseCase } from '../create-org.use-case'

export function makeCreateOrgUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const hashProvider = new BCryptHashProvider()
  return new CreateOrgUseCase(orgsRepository, hashProvider)
}
