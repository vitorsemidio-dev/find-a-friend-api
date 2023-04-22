import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials.error'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate.use-case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

const authenticateBodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const authenticateUseCase = makeAuthenticateUseCase()
    const body = authenticateBodySchema.parse(request.body)
    const { org } = await authenticateUseCase.execute(body)

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: org.id,
          expiresIn: '2d',
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(201)
      .send({
        token,
        org: {
          id: org.id,
          name: org.name,
          email: org.email,
          address: org.address,
          cep: org.cep,
          whatsappNumber: org.whatsappNumber,
        },
      })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(401).send({ message: err.message })
    }
    throw err
  }
}
