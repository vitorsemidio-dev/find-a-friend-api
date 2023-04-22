import { app } from '@/app'
import { buildRequestCreatePet } from '@/controllers/test/factories/build-request-create-pet'
import { makeCreateOrgBodySchema } from '@/controllers/test/factories/make-create-org-body-schema'
import { MakeCreatePetBodySchemaParams } from '@/controllers/test/factories/make-create-pet-body-schema'
import { Age } from '@prisma/client'
import request from 'supertest'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'

describe('ListPetsByCityUseCase', () => {
  beforeEach(async () => {
    await app.ready()
  })

  describe('List pets by city', () => {
    const createOrgBodyRequest = makeCreateOrgBodySchema()
    const authenticateBodyRequest = {
      email: createOrgBodyRequest.email,
      password: createOrgBodyRequest.password,
    }
    let token: string
    let makeRequestCreatePet: (
      override?: MakeCreatePetBodySchemaParams,
    ) => request.Test

    beforeAll(async () => {
      await app.ready()
      await request(app.server).post('/orgs').send(createOrgBodyRequest)
      const authenticateResponse = await request(app.server)
        .post('/authenticate')
        .send(authenticateBodyRequest)

      token = authenticateResponse.body.token

      makeRequestCreatePet = buildRequestCreatePet(app, token)
      await makeRequestCreatePet({ name: 'Pet01 SP', city: 'São Paulo' })
      await makeRequestCreatePet({ name: 'Pet02 SP', city: 'São Paulo' })
      await makeRequestCreatePet({ name: 'Pet03 RJ', city: 'Rio de Janeiro' })
      await makeRequestCreatePet({ name: 'Pet04 MG', city: 'Minas Gerais' })
    })

    it('should return empty list when not found pets by city', async () => {
      const response = await request(app.server).get('/pets/Recife')
      expect(response.status).toBe(200)
      expect(response.body.pets).toEqual([])
    })

    it('should return list of pets by city', async () => {
      const response = await request(app.server).get('/pets/São Paulo')

      expect(response.status).toBe(200)
      expect(response.body.pets).toHaveLength(2)
      expect(response.body.pets).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: 'Pet02 SP',
            city: 'São Paulo',
          }),
          expect.objectContaining({
            name: 'Pet01 SP',
            city: 'São Paulo',
          }),
        ]),
      )
    })
  })

  describe('List pets by city and filter by age', () => {
    const createOrgBodyRequest = makeCreateOrgBodySchema()
    const authenticateBodyRequest = {
      email: createOrgBodyRequest.email,
      password: createOrgBodyRequest.password,
    }
    let token: string
    let makeRequestCreatePet: (
      override?: MakeCreatePetBodySchemaParams,
    ) => request.Test

    beforeAll(async () => {
      await app.ready()
      await request(app.server).post('/orgs').send(createOrgBodyRequest)
      const authenticateResponse = await request(app.server)
        .post('/authenticate')
        .send(authenticateBodyRequest)

      token = authenticateResponse.body.token

      makeRequestCreatePet = buildRequestCreatePet(app, token)

      await makeRequestCreatePet({
        name: `Pet ${Age.adult}`,
        age: Age.adult,
        city: 'São Paulo',
      })
      await makeRequestCreatePet({
        name: `Pet ${Age.baby}`,
        age: Age.baby,
        city: 'São Paulo',
      })
      await makeRequestCreatePet({
        name: `Pet ${Age.senior}`,
        age: Age.senior,
        city: 'Rio de Janeiro',
      })
      await makeRequestCreatePet({
        name: `Pet ${Age.young}`,
        age: Age.young,
        city: 'Minas Gerais',
      })
    })

    it('should return list of pets by city and filter by age', async () => {
      const city = 'São Paulo'
      const age = Age.adult
      const response = await request(app.server).get(`/pets/${city}`).query({
        age,
      })

      expect(response.status).toBe(200)
      expect(response.body.pets).toHaveLength(1)
      expect(response.body.pets).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: `Pet ${age}`,
            city,
          }),
        ]),
      )
    })

    it('should return empty list when not found pets', async () => {
      const city = 'Rio de Janeiro'
      const age = Age.adult
      const response = await request(app.server).get(`/pets/${city}`).query({
        age,
      })

      expect(response.status).toBe(200)
      expect(response.body.pets).toHaveLength(0)
      expect(response.body.pets).toEqual([])
    })
  })

  it.todo(
    'should return list of pets by city and filter by energy',
    async () => {},
  )

  it.todo(
    'should return list of pets by city and filter by environment',
    async () => {},
  )

  it.todo(
    'should return list of pets by city and filter by gender',
    async () => {},
  )

  it.todo(
    'should return list of pets by city and filter by independence',
    async () => {},
  )

  it.todo(
    'should return list of pets by city and filter by size',
    async () => {},
  )

  it.todo(
    'should return list of pets by city and filter by type',
    async () => {},
  )

  it.todo(
    'should return list of pets by city and filter by all filters',
    async () => {},
  )
})
