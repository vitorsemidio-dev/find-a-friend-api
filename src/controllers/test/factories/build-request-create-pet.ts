import {
  MakeCreatePetBodySchemaParams,
  makeCreatePetBodySchema,
} from '@/controllers/test/factories/make-create-pet-body-schema'
import { FastifyInstance } from 'fastify/types/instance'
import request from 'supertest'

export const buildRequestCreatePet = (
  appInstance: FastifyInstance,
  token: string,
) => {
  return (override: MakeCreatePetBodySchemaParams = {}) => {
    const requestBody = makeCreatePetBodySchema(override)
    return request(appInstance.server)
      .post('/pets')
      .set('Authorization', `Bearer ${token}`)
      .attach('images', 'test/assets/img-01.png', 'vitest-file.png')
      .attach('images', 'test/assets/image-01.jpg', 'vitest-file.jpg')
      .field('name', requestBody.name)
      .field('description', requestBody.description)
      .field('city', requestBody.city)
      .field('age', requestBody.age)
      .field('energy', requestBody.energy)
      .field('environment', requestBody.environment)
      .field('gender', requestBody.gender)
      .field('independence', requestBody.independence)
      .field('size', requestBody.size)
      .field('type', requestBody.type)
      .field(
        'adoptionRequirements',
        JSON.stringify(requestBody.adoptionRequirements),
      )
  }
}
