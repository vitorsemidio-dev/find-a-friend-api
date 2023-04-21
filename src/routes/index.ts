import { createOrgController } from '@/controllers/create-org.controller'
import { FastifyInstance } from 'fastify'

export async function routes(app: FastifyInstance) {
  app.post('/orgs', createOrgController)
}
