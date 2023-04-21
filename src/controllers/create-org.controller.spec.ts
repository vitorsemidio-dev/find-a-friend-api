import { app } from '@/app'
import { makeCreateOrgBodySchema } from '@/controllers/test/factories/make-create-org-body-schema'
import request from 'supertest'
import { beforeEach, describe, expect, it } from 'vitest'

describe('CreateOrgController', () => {
  beforeEach(async () => {
    await app.ready()
  })

  it('should return 201 when org is created', async () => {
    const bodyRequest = makeCreateOrgBodySchema()

    const response = await request(app.server).post('/orgs').send(bodyRequest)

    expect(response.status).toBe(201)
  })
})
