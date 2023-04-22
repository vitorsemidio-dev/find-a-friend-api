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
      .send(requestBody)
  }
}
