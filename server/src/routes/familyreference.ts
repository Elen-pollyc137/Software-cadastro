import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function familyReferenceRoutes(app: FastifyInstance) {
  app.get('/familyreference', async () => {
    const users = await prisma.familyreference.findMany({
      where: {
        isPublic: true,
      },
      orderBy: {
        createdAt: 'asc',
      },
    })

    return users
  })

  app.get(
    '/familyreference/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const paramsSchema = z.object({
          id: z.string().uuid(),
        })
        const { id } = paramsSchema.parse(request.params)
        const familyReference = await prisma.familyreference.findUniqueOrThrow({
          where: {
            id,
          },
        })

        if (!familyReference) {
          return reply.status(404).send({ error: 'Family Reference not found' })
        }

        return familyReference
      } catch (error) {
        console.error(error)
        return reply.status(500).send({ error: 'Internal Server Error' })
      }
    },
  )

  app.post('/familyreference', async (request) => {
    const bodySchema = z.object({
      name: z.string(),
      cpf: z.string(),
      nis: z.string(),
      rg: z.string(),
      titulo: z.string(),
      naturalness: z.string(),
      nameMother: z.string(),
      nameFather: z.string(),
      birthdayDate: z.string(),
      surname: z.string(),
      phoneNumber: z.string(),
      matrialStatus: z.string(),
      education: z.string(),
      elderlyPerson: z.string(),
      disabledPerson: z.string(),
      folderNunber: z.string(),
      domicileLocation: z.string(),
      neighborhood: z.string(),
      serviceHistory: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })
    const {
      name,
      cpf,
      nis,
      rg,
      titulo,
      naturalness,
      nameMother,
      nameFather,
      birthdayDate,
      surname,
      phoneNumber,
      matrialStatus,
      education,
      elderlyPerson,
      disabledPerson,
      folderNunber,
      domicileLocation,
      neighborhood,
      serviceHistory,
      isPublic,
    } = bodySchema.parse(request.body)
    console.log(
      '🚀 ~ file: familyreference.ts:70 ~ app.post ~ request:',
      request,
    )
    const userid = request.headers.userid as string
    const familyreference = await prisma.familyreference.create({
      data: {
        name,
        cpf,
        nis,
        rg,
        titulo,
        naturalness,
        nameMother,
        nameFather,
        birthdayDate,
        surname,
        phoneNumber,
        matrialStatus,
        education,
        elderlyPerson,
        disabledPerson,
        folderNunber,
        domicileLocation,
        neighborhood,
        serviceHistory,
        isPublic,
        userId: 'f217e395-044f-406f-867e-91f8d12a8775',
      },
    })
    return familyreference
  })

  app.put('/familyreference:id', async (request: FastifyRequest) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)
    const bodySchema = z.object({
      isPublic: z.coerce.boolean(),
    })
    const { isPublic } = bodySchema.parse(request.body)

    const referenceatualizade = await prisma.familyreference.update({
      where: {
        id,
      },
      data: {
        isPublic,
      },
    })
    return referenceatualizade
  })
  app.delete(
    '/familyreference/:id',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const paramsSchema = z.object({
          id: z.string().uuid(),
        })
        const { id } = paramsSchema.parse(request.params)

        await prisma.familyreference.delete({
          where: {
            id,
          },
        })
      } catch (error) {
        console.error(error)
        return reply.status(500).send({ error: 'Internal Server Error' })
      }
    },
  )
}
