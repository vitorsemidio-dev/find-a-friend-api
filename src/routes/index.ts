import { authenticate } from '@/controllers/authenticate.controller'
import { createOrgController } from '@/controllers/create-org.controller'
import { FastifyInstance } from 'fastify'

export async function routes(app: FastifyInstance) {
  app.post('/authenticate', authenticate)
  app.post('/orgs', createOrgController)
}
