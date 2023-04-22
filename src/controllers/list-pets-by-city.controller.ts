import { makeListPetsByCityUseCase } from '@/use-cases/factories/make-list-pets-by-city,use-case'
import {
  Age,
  Energy,
  Environment,
  Gender,
  Independence,
  Size,
  Type,
} from '@prisma/client'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const listPetsByCityQuerySchema = z.object({
  age: z.enum([Age.adult, Age.baby, Age.senior, Age.young]).optional(),
  energy: z.enum([Energy.high, Energy.low, Energy.medium]).optional(),
  environment: z
    .enum([Environment.indoor, Environment.outdoor, Environment.spacious])
    .optional(),
  gender: z.enum([Gender.female, Gender.male]).optional(),
  independence: z
    .enum([Independence.high, Independence.low, Independence.medium])
    .optional(),
  size: z.enum([Size.large, Size.medium, Size.small]).optional(),
  type: z.enum([Type.cat, Type.dog]).optional(),
})

const listPetsByCityParamsSchema = z.object({
  city: z.string().nonempty(),
})

export async function listPetsByCityController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { city } = listPetsByCityParamsSchema.parse(request.params)
    const query = listPetsByCityQuerySchema.parse(request.query)
    const listPetsByCityUseCase = makeListPetsByCityUseCase()
    const { pets } = await listPetsByCityUseCase.execute({
      ...query,
      city,
    })
    return reply.code(200).send({
      pets,
    })
  } catch (err) {
    throw err
  }
}
