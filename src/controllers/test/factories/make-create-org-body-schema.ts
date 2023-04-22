import { CreateOrgBodySchema } from '@/controllers/create-org.controller'

const makeRandomEmail = () => {
  const random = Math.random().toString(36).substring(7)
  return `${random}@${random}.com`
}

export function makeCreateOrgBodySchema(
  override: Partial<CreateOrgBodySchema> = {},
): CreateOrgBodySchema {
  return {
    address: 'Rua do Pet, 123 - São Paulo - SP',
    cep: '00000-000',
    email: makeRandomEmail(),
    name: 'Find A Friend Org',
    password: '123456',
    whatsappNumber: '5511999999999',
    ...override,
  }
}
