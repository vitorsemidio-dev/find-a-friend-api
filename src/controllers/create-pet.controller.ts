import { makeCreatePetUseCase } from '@/use-cases/factories/make-create-pet.use-case'
import { makeStorageFileUseCase } from '@/use-cases/factories/make-storage-file.use-case'
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
  energy: z.enum([
    Energy.high,
    Energy.low,
    Energy.medium,
    Energy.veryHigh,
    Energy.veryLow,
  ]),
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
})

export type CreatePetControllerInput = z.infer<typeof createPetBodySchema>

export async function createPetController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { sub: orgId } = request.user
    const requestBody = request.body as Record<string, any>
    requestBody.adoptionRequirements = JSON.parse(
      requestBody.adoptionRequirements,
    )
    const storageFileUseCase = makeStorageFileUseCase()
    const { paths } = await storageFileUseCase.execute(request.files)
    const petGallery = paths
    const body = createPetBodySchema.parse(requestBody)
    const createPetUseCase = makeCreatePetUseCase()
    await createPetUseCase.execute({
      ...body,
      petGallery,
      orgId,
    })

    return reply.code(201).send()
  } catch (err) {
    throw err
  }
}
