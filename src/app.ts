import { env } from '@/env'
import { routes } from '@/routes'
import fastifyCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import fastifyJwt from '@fastify/jwt'
import fastify from 'fastify'
import { ZodError } from 'zod'

export const app = fastify()

// Plugins - CORS
app.register(cors, {
  origin: true,
  credentials: true,
})

// Plugins - JWT
app.register(fastifyJwt, {
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '10m',
  },
})

// Plugins - Cookie
app.register(fastifyCookie)

// Plugins - Routes
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
