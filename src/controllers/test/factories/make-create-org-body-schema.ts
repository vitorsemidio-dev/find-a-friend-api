import { CreateOrgBodySchema } from '@/controllers/create-org.controller'

export function makeCreateOrgBodySchema(
  override: Partial<CreateOrgBodySchema> = {},
): CreateOrgBodySchema {
  return {
    address: 'Rua do Pet, 123 - São Paulo - SP',
    cep: '00000-000',
    email: 'find_a_friend@email.com',
    name: 'Find A Friend Org',
    password: '123456',
    whatsappNumber: '5511999999999',
    ...override,
  }
}
