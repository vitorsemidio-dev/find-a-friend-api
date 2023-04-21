import { prisma } from '@/lib/prisma'
import { OrgsRepository } from '@/repositories/orgs.repository'
import { Org, Prisma } from '@prisma/client'

export class PrismaOrgsRepository implements OrgsRepository {
  async create(data: Prisma.OrgUncheckedCreateInput): Promise<Org> {
    const org = await prisma.org.create({
      data,
    })

    return org
  }

  async findByEmail(email: string): Promise<Org | null> {
    const org = await prisma.org.findFirst({
      where: {
        email,
      },
    })

    return org
  }
}
