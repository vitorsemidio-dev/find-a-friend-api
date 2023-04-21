import { OrgsRepository } from '@/repositories/orgs.repository'
import { Org, Prisma } from '@prisma/client'
import { randomUUID } from 'crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  private orgs: Org[] = []

  async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const org = {
      ...data,
      id: data.id || randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    this.orgs.push(org)

    return org
  }
}
