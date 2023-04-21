import { OrgAlreadyExistsError } from '@/use-cases/errors/org-already-exists.error'
import { makeCreateOrgUseCase } from '@/use-cases/factores/make-create-org.use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const createOrgBodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  address: z.string(),
  cep: z.string(),
  whatsappNumber: z.string(),
  password: z.string(),
})

export type CreateOrgBodySchema = z.infer<typeof createOrgBodySchema>

export async function createOrgController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const body = createOrgBodySchema.parse(request.body)
    const createOrgUseCase = makeCreateOrgUseCase()
    await createOrgUseCase.execute(body)
  } catch (err) {
    if (err instanceof OrgAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }
    throw err
  }

  return reply.status(201).send()
}
