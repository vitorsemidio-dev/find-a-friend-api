import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet.use-case'
import {
  Age,
  Energy,
  Environment,
  Gender,
  Independence,
  Size,
  Type,
} from '@prisma/client'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

const createPetBodySchema = z.object({
  name: z.string(),
  description: z.string(),
  city: z.string(),
  age: z.enum([Age.adult, Age.baby, Age.senior, Age.young]),
  energy: z.enum([Energy.high, Energy.low, Energy.medium]),
  environment: z.enum([
    Environment.indoor,
    Environment.outdoor,
    Environment.spacious,
  ]),
  gender: z.enum([Gender.female, Gender.male]),
  independence: z.enum([
    Independence.high,
    Independence.low,
    Independence.medium,
  ]),
  size: z.enum([Size.large, Size.medium, Size.small]),
  type: z.enum([Type.cat, Type.dog]),
  adoptionRequirements: z.array(z.string()),
  petGallery: z.array(z.string()),
})

export type CreatePetControllerInput = z.infer<typeof createPetBodySchema>

export async function createPetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { sub: orgId } = request.user
    const body = createPetBodySchema.parse(request.body)
    const createPetUseCase = makeCreatePetUseCase()
    await createPetUseCase.execute({
      ...body,
      orgId,
    })
    return reply.code(201).send()
  } catch (err) {
    throw err
  }
}
