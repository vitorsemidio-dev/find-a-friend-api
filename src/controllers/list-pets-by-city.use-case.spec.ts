import { app } from '@/app'
import { beforeEach, describe, expect, it } from 'vitest'
import request from 'supertest'

describe('ListPetsByCityUseCase', () => {
  beforeEach(async () => {
    await app.ready()
  })

  it('should return empty list when not found pets by city', async () => {
    const response = await request(app.server).get('/pets/Recife')
    expect(response.status).toBe(200)
    expect(response.body.pets).toEqual([])
  })

  it.todo('should return list of pets by city', async () => {})

  it.todo(
    'should return list of pets by city and filter by age',
    async () => {},
  )

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
