import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { routes } from './routes'

export const app = fastify()

app.register(routes)

app.setErrorHandler((err, _request, reply) => {
  if (err instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      errors: err.format(),
    })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(err)
  }
  reply.status(500).send({
    message: 'Internal server error',
  })
})
