import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found.error'
import { makeGetPetDetailUseCase } from '@/use-cases/factories/make-get-pet-detail.use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const getPetDetailParamsSchema = z.object({
  id: z.string(),
})

export async function getPetDetailController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { id } = getPetDetailParamsSchema.parse(request.params)
    const getPetDetailUseCase = makeGetPetDetailUseCase()
    const { pet } = await getPetDetailUseCase.execute({ petId: id })

    return reply.status(200).send({ pet })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: err.message })
    }
    throw err
  }
}
