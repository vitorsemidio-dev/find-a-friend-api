import { CreatePetControllerInput } from '@/controllers/create-pet.controller'

export type MakeCreatePetBodySchemaParams = Partial<CreatePetControllerInput>
export type MakeCreatePetBodySchemaResult = CreatePetControllerInput

export function makeCreatePetBodySchema(
  override: MakeCreatePetBodySchemaParams = {},
): MakeCreatePetBodySchemaResult {
  return {
    name: 'pet 1',
    description: 'pet 1',
    city: 'São Paulo',
    age: 'baby',
    energy: 'low',
    environment: 'indoor',
    gender: 'male',
    independence: 'low',
    size: 'small',
    type: 'dog',
    adoptionRequirements: ['Requisito A', 'Requisito B', 'Requisito C'],
    petGallery: ['imagem A', 'imagem B', 'imagem C'],
    ...override,
  }
}
