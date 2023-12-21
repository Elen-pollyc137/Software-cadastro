import fastify from 'fastify'
import { prisma } from './lib/prisma'
import { userRoutes } from './routes/user'
import { authRoutes } from './routes/auth'
import { familyReferenceRoutes } from './routes/familyreference'
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

const app = fastify()

app.register(cors, {
  origin: true,
  credentials: true,
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Accept',
    'Content-Type',
    'Authorization',
  ],
  exposedHeaders: ['Content-Range', 'X-Content-Range'],
  preflightContinue: false,
  optionsSuccessStatus: 204,
})
app.register(jwt, {
  secret: 'Trabalho',
})

app.register(userRoutes)
app.register(authRoutes)
app.register(familyReferenceRoutes)

app
  .listen({
    port: 3333,
  })

  .then(async () => {
    await prisma.$disconnect()
    console.log('🚀 ~ file: server.ts:17 ~ port:3333')
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
