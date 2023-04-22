import { CreatePetControllerInput } from '@/controllers/create-pet.controller'

export function makeCreatePetBodySchema(
  override: Partial<CreatePetControllerInput> = {},
): CreatePetControllerInput {
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
