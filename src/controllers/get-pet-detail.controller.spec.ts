import { app } from '@/app'
import { buildRequestCreatePet } from '@/controllers/test/factories/build-request-create-pet'
import { makeCreateOrgBodySchema } from '@/controllers/test/factories/make-create-org-body-schema'
import { MakeCreatePetBodySchemaParams } from '@/controllers/test/factories/make-create-pet-body-schema'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found.error'
import { randomUUID } from 'crypto'
import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

describe('GetPetDetailController', () => {
  beforeEach(async () => {
    await app.ready()
  })

  describe('Get Pet Detail', () => {
    const createOrgBodyRequest = makeCreateOrgBodySchema()
    const authenticateBodyRequest = {
      email: createOrgBodyRequest.email,
      password: createOrgBodyRequest.password,
    }
    let token: string
    let petId: string
    let makeRequestCreatePet: (
      override?: MakeCreatePetBodySchemaParams,
    ) => request.Test

    beforeEach(async () => {
      await request(app.server).post('/orgs').send(createOrgBodyRequest)
      const authenticateResponse = await request(app.server)
        .post('/authenticate')
        .send(authenticateBodyRequest)

      token = authenticateResponse.body.token

      makeRequestCreatePet = buildRequestCreatePet(app, token)
      const { body } = await makeRequestCreatePet()
      petId = body.pet.id
    })

    it('should return 200 when pet is found', async () => {
      const response = await request(app.server).get(`/pets/detail/${petId}`)

      expect(response.status).toBe(200)
      expect(response.body.pet).toBeDefined()
    })

    it('should return 404 when pet is not found', async () => {
      const invalidPetId = randomUUID()

      const response = await request(app.server).get(
        `/pets/detail/${invalidPetId}`,
      )

      expect(response.status).toBe(404)
      expect(response.body.message).toEqual(new ResourceNotFoundError().message)
    })

    it('should return pet detail with pet adoptions requirements defined', async () => {
      const response = await request(app.server).get(`/pets/detail/${petId}`)

      expect(response.status).toBe(200)
      expect(response.body.pet.adoptionRequirements).toBeDefined()
    })

    it('should return pet detail with pet gallery defined', async () => {
      const response = await request(app.server).get(`/pets/detail/${petId}`)

      expect(response.status).toBe(200)
      expect(response.body.pet.petGallery).toBeDefined()
    })

    it('should return pet detail with org defined', async () => {
      const response = await request(app.server).get(`/pets/detail/${petId}`)

      expect(response.status).toBe(200)
      expect(response.body.pet.org).toBeDefined()
    })
  })
})
