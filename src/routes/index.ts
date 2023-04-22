import { authenticate } from '@/controllers/authenticate.controller'
import { createOrgController } from '@/controllers/create-org.controller'
import { createPetController } from '@/controllers/create-pet.controller'
import { verifyJWT } from '@/middlewares/verifyJWT'
import { FastifyInstance } from 'fastify'

export async function routes(app: FastifyInstance) {
  app.post('/authenticate', authenticate)
  app.post('/orgs', createOrgController)

  app.post('/pets', { onRequest: verifyJWT }, createPetController)
}
