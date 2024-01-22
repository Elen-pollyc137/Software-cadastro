import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'
import jwt from 'jsonwebtoken'
import axios from 'axios'

export async function userRoutes(app: FastifyInstance) {
  app.get('/users', async () => {
    const users = await prisma.user.findMany()

    return users
  })

  app.post('/users', async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      const bodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.number(),
      })
      const { name, email, password } = bodySchema.parse(request.body)

      const generateToken = (): string => {
        const payload = {
          userId: 123,
          username: 'example',
        }

        const token = jwt.sign(payload, 'secret-key', {
          expiresIn: '4h',
        })

        return token
      }

      const createdUser = await prisma.user.create({
        data: {
          name,
          email,
          password,
          token: generateToken(), // Fornecer um valor padrão para o token
        },
      })

      reply.send(createdUser)
    } catch (error) {
      console.error(error)
      reply.status(500).send({ error: 'Internal Server Error' })
    }
  })

  app.put(
    '/users/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const paramsSchema = z.object({
          id: z.string().uuid(),
        })

        const { id } = paramsSchema.parse(request.params)

        const bodySchema = z.object({
          name: z.string(),
          email: z.string(),
          password: z.number(),
        })

        const { name, email, password } = bodySchema.parse(request.body)

        const updatedUser = await prisma.user.update({
          where: {
            id,
          },
          data: {
            name,
            email,
            password,
          },
        })

        reply.send(updatedUser)
      } catch (error) {
        console.error(error)
        reply.status(500).send({ error: 'Internal Server Error' })
      }
    },
  )
}
