import { Prisma } from '@prisma/client'

export function makeOrgModel(
  override: Partial<Prisma.OrgUncheckedCreateInput> = {},
): Prisma.OrgUncheckedCreateInput {
  return {
    name: 'Org Name',
    email: 'org@email.com',
    address: 'Org Address',
    cep: '00000-000',
    whatsappNumber: '00000000000',
    password: 'org-password',
    ...override,
  }
}
