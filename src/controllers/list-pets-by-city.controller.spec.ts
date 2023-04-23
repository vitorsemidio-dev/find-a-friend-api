import { app } from '@/app'
import { buildRequestCreatePet } from '@/controllers/test/factories/build-request-create-pet'
import { makeCreateOrgBodySchema } from '@/controllers/test/factories/make-create-org-body-schema'
import { MakeCreatePetBodySchemaParams } from '@/controllers/test/factories/make-create-pet-body-schema'
import { prisma } from '@/lib/prisma'
import {
  Age,
  Energy,
  Environment,
  Gender,
  Independence,
  Size,
  Type,
} from '@prisma/client'
import request from 'supertest'
import { beforeAll, beforeEach, describe, expect, it } from 'vitest'

describe('ListPetsByCityUseCase', () => {
  let token: string
  let makeRequestCreatePet: (
    override?: MakeCreatePetBodySchemaParams,
  ) => request.Test

  beforeEach(async () => {
    await app.ready()
    const createOrgBodyRequest = makeCreateOrgBodySchema()
    const authenticateBodyRequest = {
      email: createOrgBodyRequest.email,
      password: createOrgBodyRequest.password,
    }
    await request(app.server).post('/orgs').send(createOrgBodyRequest)
    const authenticateResponse = await request(app.server)
      .post('/authenticate')
      .send(authenticateBodyRequest)

    token = authenticateResponse.body.token

    makeRequestCreatePet = buildRequestCreatePet(app, token)
  })

  beforeEach(async () => {
    await prisma.petGallery.deleteMany()
    await prisma.adoptionRequirements.deleteMany()
    await prisma.pet.deleteMany()
  })

  describe('List pets by city', () => {
    beforeEach(async () => {
      await app.ready()
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
    beforeEach(async () => {
      await app.ready()

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
            age,
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

  describe('List pets by city and filter by energy', () => {
    beforeEach(async () => {
      await app.ready()

      await makeRequestCreatePet({
        name: `Pet01 Energy ${Energy.high}`,
        energy: Energy.high,
        city: 'São Paulo',
      })
      await makeRequestCreatePet({
        name: `Pet02 Energy ${Energy.high}`,
        energy: Energy.high,
        city: 'São Paulo',
      })
      await makeRequestCreatePet({
        name: `Pet03 Energy ${Energy.low}`,
        energy: Energy.low,
        city: 'Rio de Janeiro',
      })
      await makeRequestCreatePet({
        name: `Pet04 Energy ${Energy.veryHigh}`,
        energy: Energy.veryHigh,
        city: 'Minas Gerais',
      })
    })

    it('should return list of pets by city and filter by energy', async () => {
      const city = 'São Paulo'
      const energy = Energy.high
      const response = await request(app.server).get(`/pets/${city}`).query({
        energy,
      })

      expect(response.status).toBe(200)
      expect(response.body.pets).toHaveLength(2)
      expect(response.body.pets).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: `Pet02 Energy ${energy}`,
            city,
            energy,
          }),
          expect.objectContaining({
            name: `Pet01 Energy ${energy}`,
            city,
            energy,
          }),
        ]),
      )
    })

    it('should return empty list when not found pets', async () => {
      const city = 'Minas Gerais'
      const energy = Energy.low
      const response = await request(app.server).get(`/pets/${city}`).query({
        energy,
      })

      expect(response.status).toBe(200)
      expect(response.body.pets).toHaveLength(0)
      expect(response.body.pets).toEqual([])
    })
  })

  describe('List pets by city and filter by environment', () => {
    beforeEach(async () => {
      await app.ready()

      await makeRequestCreatePet({
        name: `Pet01 Environment ${Environment.indoor}`,
        environment: Environment.indoor,
        city: 'São Paulo',
      })
      await makeRequestCreatePet({
        name: `Pet02 Environment ${Environment.indoor}`,
        environment: Environment.indoor,
        city: 'São Paulo',
      })
      await makeRequestCreatePet({
        name: `Pet03 Environment ${Environment.spacious}`,
        environment: Environment.spacious,
        city: 'Rio de Janeiro',
      })
      await makeRequestCreatePet({
        name: `Pet04 Environment ${Environment.outdoor}`,
        environment: Environment.outdoor,
        city: 'Minas Gerais',
      })
    })

    it('should return list of pets by city and filter by environment', async () => {
      const city = 'São Paulo'
      const environment = Environment.indoor
      const response = await request(app.server).get(`/pets/${city}`).query({
        environment: environment,
      })

      expect(response.status).toBe(200)
      expect(response.body.pets).toHaveLength(2)
      expect(response.body.pets).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: `Pet02 Environment ${environment}`,
            city,
            environment,
          }),
          expect.objectContaining({
            name: `Pet01 Environment ${environment}`,
            city,
            environment,
          }),
        ]),
      )
    })

    it('should return empty list when not found pets', async () => {
      const city = 'Rio de Janeiro'
      const environment = Environment.indoor
      const response = await request(app.server).get(`/pets/${city}`).query({
        environment,
      })

      expect(response.status).toBe(200)
      expect(response.body.pets).toHaveLength(0)
      expect(response.body.pets).toEqual([])
    })
  })

  describe('List pets by city and filter by gender', () => {
    beforeEach(async () => {
      await app.ready()

      await makeRequestCreatePet({
        name: `Pet01 Gender ${Gender.male}`,
        gender: Gender.male,
        city: 'São Paulo',
      })
      await makeRequestCreatePet({
        name: `Pet02 Gender ${Gender.male}`,
        gender: Gender.male,
        city: 'São Paulo',
      })
      await makeRequestCreatePet({
        name: `Pet03 Gender ${Gender.female}`,
        gender: Gender.female,
        city: 'Rio de Janeiro',
      })
      await makeRequestCreatePet({
        name: `Pet04 Gender ${Gender.male}`,
        gender: Gender.male,
        city: 'Minas Gerais',
      })
    })

    it('should return list of pets by city and filter by gender', async () => {
      const city = 'São Paulo'
      const gender = Gender.male
      const response = await request(app.server).get(`/pets/${city}`).query({
        gender,
      })

      expect(response.status).toBe(200)
      expect(response.body.pets).toHaveLength(2)
      expect(response.body.pets).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: `Pet02 Gender ${gender}`,
            city,
            gender,
          }),
          expect.objectContaining({
            name: `Pet01 Gender ${gender}`,
            city,
            gender,
          }),
        ]),
      )
    })

    it('should return empty list when not found pets', async () => {
      const city = 'Minas Gerais'
      const gender = Gender.female
      const response = await request(app.server).get(`/pets/${city}`).query({
        gender,
      })

      expect(response.status).toBe(200)
      expect(response.body.pets).toHaveLength(0)
      expect(response.body.pets).toEqual([])
    })
  })

  describe('List pets by city and filter by independence', () => {
    beforeEach(async () => {
      await app.ready()

      await makeRequestCreatePet({
        name: `Pet01 Independence ${Independence.high}`,
        independence: Independence.high,
        city: 'São Paulo',
      })
      await makeRequestCreatePet({
        name: `Pet02 Independence ${Independence.high}`,
        independence: Independence.high,
        city: 'São Paulo',
      })
      await makeRequestCreatePet({
        name: `Pet03 Independence ${Independence.low}`,
        independence: Independence.low,
        city: 'Rio de Janeiro',
      })
      await makeRequestCreatePet({
        name: `Pet04 Independence ${Independence.medium}`,
        independence: Independence.medium,
        city: 'Minas Gerais',
      })
    })

    it('should return list of pets by city and filter by independence', async () => {
      const city = 'São Paulo'
      const independence = Independence.high
      const response = await request(app.server).get(`/pets/${city}`).query({
        independence,
      })

      expect(response.status).toBe(200)
      expect(response.body.pets).toHaveLength(2)
      expect(response.body.pets).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: `Pet02 Independence ${independence}`,
            city,
            independence,
          }),
          expect.objectContaining({
            name: `Pet01 Independence ${independence}`,
            city,
            independence,
          }),
        ]),
      )
    })

    it('should return empty list when not found pets', async () => {
      const city = 'Minas Gerais'
      const independence = Independence.high
      const response = await request(app.server).get(`/pets/${city}`).query({
        independence,
      })

      expect(response.status).toBe(200)
      expect(response.body.pets).toHaveLength(0)
      expect(response.body.pets).toEqual([])
    })
  })

  describe('List pets by city and filter by size', () => {
    beforeEach(async () => {
      await app.ready()

      await makeRequestCreatePet({
        name: `Pet01 Size ${Size.medium}`,
        size: Size.medium,
        city: 'São Paulo',
      })
      await makeRequestCreatePet({
        name: `Pet02 Size ${Size.medium}`,
        size: Size.medium,
        city: 'São Paulo',
      })
      await makeRequestCreatePet({
        name: `Pet03 Size ${Size.large}`,
        size: Size.large,
        city: 'Rio de Janeiro',
      })
      await makeRequestCreatePet({
        name: `Pet04 Size ${Size.small}`,
        size: Size.small,
        city: 'Minas Gerais',
      })
    })

    it('should return list of pets by city and filter by size', async () => {
      const city = 'São Paulo'
      const size = Size.medium
      const response = await request(app.server).get(`/pets/${city}`).query({
        size,
      })

      expect(response.status).toBe(200)
      expect(response.body.pets).toHaveLength(2)
      expect(response.body.pets).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: `Pet02 Size ${size}`,
            city,
            size,
          }),
          expect.objectContaining({
            name: `Pet01 Size ${size}`,
            city,
            size,
          }),
        ]),
      )
    })

    it('should return empty list when not found pets', async () => {
      const city = 'Minas Gerais'
      const size = Size.large
      const response = await request(app.server).get(`/pets/${city}`).query({
        size,
      })

      expect(response.status).toBe(200)
      expect(response.body.pets).toHaveLength(0)
      expect(response.body.pets).toEqual([])
    })
  })

  describe('List pets by city and filter by type', () => {
    beforeEach(async () => {
      await app.ready()

      await makeRequestCreatePet({
        name: `Pet01 Type ${Type.cat}`,
        type: Type.cat,
        city: 'São Paulo',
      })
      await makeRequestCreatePet({
        name: `Pet02 Type ${Type.cat}`,
        type: Type.cat,
        city: 'São Paulo',
      })
      await makeRequestCreatePet({
        name: `Pet03 Type ${Type.dog}`,
        type: Type.dog,
        city: 'Rio de Janeiro',
      })
      await makeRequestCreatePet({
        name: `Pet04 Type ${Type.cat}`,
        type: Type.cat,
        city: 'Minas Gerais',
      })
    })

    it('should return list of pets by city and filter by type', async () => {
      const city = 'São Paulo'
      const type = Type.cat
      const response = await request(app.server).get(`/pets/${city}`).query({
        type,
      })

      expect(response.status).toBe(200)
      expect(response.body.pets).toHaveLength(2)
      expect(response.body.pets).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            name: `Pet02 Type ${type}`,
            city,
            type,
          }),
          expect.objectContaining({
            name: `Pet01 Type ${type}`,
            city,
            type,
          }),
        ]),
      )
    })

    it('should return empty list when not found pets', async () => {
      const city = 'Minas Gerais'
      const type = Type.dog
      const response = await request(app.server).get(`/pets/${city}`).query({
        type,
      })

      expect(response.status).toBe(200)
      expect(response.body.pets).toHaveLength(0)
      expect(response.body.pets).toEqual([])
    })
  })

  describe('List pets by city and all filters', () => {
    beforeEach(async () => {
      await app.ready()

      await makeRequestCreatePet({
        name: `Pet01 All`,
        age: Age.young,
        energy: Energy.high,
        environment: Environment.spacious,
        gender: Gender.male,
        independence: Independence.high,
        size: Size.large,
        type: Type.dog,
        city: 'São Paulo',
      })
      await makeRequestCreatePet({
        name: `Pet02 All`,
        city: 'São Paulo',
      })
      await makeRequestCreatePet({
        name: `Pet03 All`,
        city: 'Rio de Janeiro',
      })
      await makeRequestCreatePet({
        name: `Pet04 All`,
        city: 'Minas Gerais',
      })
    })

    it('should return list of pets by city and filter by all filters', async () => {
      const city = 'São Paulo'
      const filters = {
        age: Age.young,
        energy: Energy.high,
        environment: Environment.spacious,
        gender: Gender.male,
        independence: Independence.high,
        size: Size.large,
        type: Type.dog,
      }

      const response = await request(app.server)
        .get(`/pets/${city}`)
        .query(filters)

      expect(response.body.pets).toHaveLength(1)
      expect(response.body.pets).toEqual([
        expect.objectContaining({
          city,
          type: filters.type,
          age: filters.age,
          energy: filters.energy,
          environment: filters.environment,
          gender: filters.gender,
          independence: filters.independence,
          size: filters.size,
          name: `Pet01 All`,
        }),
      ])
    })

    it('should return empty list when not found pets', async () => {
      const city = 'Minas Gerais'
      const filters = {
        type: Type.cat,
        age: Age.baby,
        energy: Energy.veryLow,
        environment: Environment.outdoor,
        gender: Gender.female,
        independence: Independence.low,
        size: Size.small,
      }

      const response = await request(app.server)
        .get(`/pets/${city}`)
        .query(filters)

      expect(response.body.pets).toHaveLength(0)
    })
  })
})
