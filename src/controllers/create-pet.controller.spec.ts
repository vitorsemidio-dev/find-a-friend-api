import { app } from '@/app'
import { makeCreateOrgBodySchema } from '@/controllers/test/factories/make-create-org-body-schema'
import { makeCreatePetBodySchema } from '@/controllers/test/factories/make-create-pet-body-schema'
import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

describe('CreatePetController', () => {
  beforeEach(async () => {
    await app.ready()
  })

  describe('should create a pet', () => {
    const createOrgBodyRequest = makeCreateOrgBodySchema()
    const authenticateBodyRequest = {
      email: createOrgBodyRequest.email,
      password: createOrgBodyRequest.password,
    }
    let token: string

    beforeEach(async () => {
      await request(app.server).post('/orgs').send(createOrgBodyRequest)
      const authenticateResponse = await request(app.server)
        .post('/authenticate')
        .send(authenticateBodyRequest)

      token = authenticateResponse.body.token
    })

    it('should return 201 when pet is created', async () => {
      const bodyRequest = makeCreatePetBodySchema()

      const response = await request(app.server)
        .post('/pets')
        .set('Authorization', `Bearer ${token}`)
        .send(bodyRequest)

      expect(response.status).toBe(201)
    })
  })
})
