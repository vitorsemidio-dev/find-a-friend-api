import { uploadConfig } from '@/configs/upload.config'
import { authenticate } from '@/controllers/authenticate.controller'
import { createOrgController } from '@/controllers/create-org.controller'
import { createPetController } from '@/controllers/create-pet.controller'
import { listPetsByCityController } from '@/controllers/list-pets-by-city.controller'
import { verifyJWT } from '@/middlewares/verifyJWT'
import { FastifyInstance } from 'fastify'
import fastifyMulter from 'fastify-multer'

const upload = fastifyMulter(uploadConfig)

export async function routes(app: FastifyInstance) {
  app.post('/authenticate', authenticate)
  app.post('/orgs', createOrgController)

  app.get('/pets/:city', listPetsByCityController)

  app.post(
    '/pets',
    { onRequest: verifyJWT, preHandler: upload.array('images', 6) },
    createPetController,
  )
}
