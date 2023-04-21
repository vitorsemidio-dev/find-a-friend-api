import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets.repository'
import { ListPetsByCityUseCase } from '@/use-cases/list-pets-by-city.use-case'
import { makePetModel } from '@/use-cases/test/factories/make-pet-model'
import { beforeEach, describe, expect, it } from 'vitest'

describe('ListPetsByCityUseCase', () => {
  let sut: ListPetsByCityUseCase
  let petsRepository: InMemoryPetsRepository

  beforeEach(() => {
    petsRepository = new InMemoryPetsRepository()

    sut = new ListPetsByCityUseCase(petsRepository)
  })

  it('should list pets by city', async () => {
    await petsRepository.create(makePetModel({ city: 'São Paulo' }))
    await petsRepository.create(makePetModel({ city: 'São Paulo' }))
    await petsRepository.create(makePetModel({ city: 'Rio de Janeiro' }))
    await petsRepository.create(makePetModel({ city: 'Minas Gerais' }))

    const { pets } = await sut.execute({
      city: 'São Paulo',
    })

    expect(pets).toHaveLength(2)
  })

  it('should list pets by city and age', async () => {
    const age = 'adult'
    await petsRepository.create(makePetModel({ city: 'São Paulo', age }))
    await petsRepository.create(makePetModel({ city: 'São Paulo', age }))
    await petsRepository.create(makePetModel({ city: 'Rio de Janeiro', age }))
    await petsRepository.create(makePetModel({ city: 'Minas Gerais', age }))

    const { pets } = await sut.execute({
      city: 'São Paulo',
      age,
    })

    expect(pets).toHaveLength(2)
  })

  it('should list pets by city and energy', async () => {
    const energy = 'high'
    await petsRepository.create(makePetModel({ city: 'São Paulo', energy }))
    await petsRepository.create(makePetModel({ city: 'São Paulo', energy }))
    await petsRepository.create(
      makePetModel({ city: 'Rio de Janeiro', energy }),
    )
    await petsRepository.create(makePetModel({ city: 'Minas Gerais', energy }))

    const { pets } = await sut.execute({
      city: 'São Paulo',
      energy,
    })

    expect(pets).toHaveLength(2)
  })

  it('should list pets by city and environment', async () => {
    const environment = 'indoor'
    await petsRepository.create(
      makePetModel({ city: 'São Paulo', environment }),
    )
    await petsRepository.create(
      makePetModel({ city: 'São Paulo', environment }),
    )
    await petsRepository.create(
      makePetModel({ city: 'Rio de Janeiro', environment }),
    )
    await petsRepository.create(
      makePetModel({ city: 'Minas Gerais', environment }),
    )

    const { pets } = await sut.execute({
      city: 'São Paulo',
      environment,
    })

    expect(pets).toHaveLength(2)
  })

  it('should list pets by city and gender', async () => {
    const gender = 'male'
    await petsRepository.create(makePetModel({ city: 'São Paulo', gender }))
    await petsRepository.create(makePetModel({ city: 'São Paulo', gender }))
    await petsRepository.create(
      makePetModel({ city: 'Rio de Janeiro', gender }),
    )
    await petsRepository.create(makePetModel({ city: 'Minas Gerais', gender }))

    const { pets } = await sut.execute({
      city: 'São Paulo',
      gender,
    })

    expect(pets).toHaveLength(2)
  })

  it('should list pets by city and independence', async () => {
    const independence = 'high'
    await petsRepository.create(
      makePetModel({ city: 'São Paulo', independence }),
    )
    await petsRepository.create(
      makePetModel({ city: 'São Paulo', independence }),
    )
    await petsRepository.create(
      makePetModel({ city: 'Rio de Janeiro', independence }),
    )
    await petsRepository.create(
      makePetModel({ city: 'Minas Gerais', independence }),
    )

    const { pets } = await sut.execute({
      city: 'São Paulo',
      independence,
    })

    expect(pets).toHaveLength(2)
  })

  it('should list pets by city and size', async () => {
    const size = 'large'
    await petsRepository.create(makePetModel({ city: 'São Paulo', size }))
    await petsRepository.create(makePetModel({ city: 'São Paulo', size }))
    await petsRepository.create(makePetModel({ city: 'Rio de Janeiro', size }))
    await petsRepository.create(makePetModel({ city: 'Minas Gerais', size }))

    const { pets } = await sut.execute({
      city: 'São Paulo',
      size,
    })

    expect(pets).toHaveLength(2)
  })

  it('should list pets by city and type', async () => {
    const type = 'dog'
    await petsRepository.create(makePetModel({ city: 'São Paulo', type }))
    await petsRepository.create(makePetModel({ city: 'São Paulo', type }))
    await petsRepository.create(makePetModel({ city: 'Rio de Janeiro', type }))
    await petsRepository.create(makePetModel({ city: 'Minas Gerais', type }))

    const { pets } = await sut.execute({
      city: 'São Paulo',
      type,
    })

    expect(pets).toHaveLength(2)
  })
})
