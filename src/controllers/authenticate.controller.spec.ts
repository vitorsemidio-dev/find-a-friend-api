import { app } from '@/app'
import { makeCreateOrgBodySchema } from '@/controllers/test/factories/make-create-org-body-schema'
import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

describe('AuthenticateController', () => {
  beforeEach(async () => {
    await app.ready()
  })

  it('should return 201', async () => {
    const input = {
      email: 'find_a_friend_status@pet.com',
      password: '123456',
    }
    const org = makeCreateOrgBodySchema(input)
    await request(app.server).post('/orgs').send(org).expect(201)

    const response = await request(app.server).post('/authenticate').send(input)

    expect(response.status).toBe(201)
  })

  it('should return token', async () => {
    const input = {
      email: 'find_a_friend_token@pet.com',
      password: '123456',
    }
    const org = makeCreateOrgBodySchema(input)
    await request(app.server).post('/orgs').send(org).expect(201)

    const response = await request(app.server).post('/authenticate').send(input)

    expect(response.body.token).toBeDefined()
    expect(response.body.token).toEqual(expect.any(String))
  })

  it('should return org', async () => {
    const input = {
      email: 'find_a_friend_org@pet.com',
      password: '123456',
    }
    const org = makeCreateOrgBodySchema(input)
    await request(app.server).post('/orgs').send(org).expect(201)

    const response = await request(app.server).post('/authenticate').send(input)

    expect(response.body.org).toBeDefined()
    expect(response.body.org.id).toBeDefined()
    expect(response.body.org).toMatchObject({
      name: org.name,
      email: org.email,
      address: org.address,
      cep: org.cep,
      whatsappNumber: org.whatsappNumber,
    })
  })

  it('should not return password property', async () => {
    const input = {
      email: 'find_a_friend_password@pet.com',
      password: '123456',
    }
    const org = makeCreateOrgBodySchema(input)
    await request(app.server).post('/orgs').send(org).expect(201)

    const response = await request(app.server).post('/authenticate').send(input)

    expect(response.body.org).toBeDefined()
    expect(response.body.org.password).toBeUndefined()
  })

  it('should return refreshToken cookie', async () => {
    const input = {
      email: 'find_a_friend_refreshToken@email.com',
      password: '123456',
    }
    const org = makeCreateOrgBodySchema(input)
    await request(app.server).post('/orgs').send(org).expect(201)

    const response = await request(app.server).post('/authenticate').send(input)
    expect(response.headers['set-cookie']).toBeDefined()
    expect(response.get('Set-Cookie')).toEqual([
      expect.stringContaining('refreshToken='),
    ])
  })
})
