import { FastifyInstance } from 'fastify'
import { prisma } from '../lib/prisma'
import { z } from 'zod'

export async function familyReferenceRoutes(app: FastifyInstance) {
  app.get('/familyreference', async (request) => {
    await request.jwtVerify()
    const users = await prisma.familyreference.findMany({
      // Ordenar de novo por numero de pasta
      orderBy: {
        createdAt: 'asc',
      },
    })

    return users
  })
  app.get('/familyreference:id', async (request) => {
    // const { id } = request.params
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)
    const familyreference = await prisma.familyreference.findUniqueOrThrow({
      where: {
        id,
      },
    })
    return familyreference
  })

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
        isPublic,
        userId: userid,
      },
    })
    return familyreference
  })

  app.put('/familyreference:id', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)
    const bodySchema = z.object({
      name: z.string(),
      cpf: z.string(),
      isPublic: z.coerce.boolean().default(false),
    })
    const { name, cpf, isPublic } = bodySchema.parse(request.body)

    const referenceatualizade = await prisma.familyreference.update({
      where: {
        id,
      },
      data: {
        name,
        cpf,
        isPublic,
      },
    })
    return referenceatualizade
  })

  app.delete('/familyreference', async (request) => {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(request.params)
    await prisma.familyreference.delete({
      where: {
        id,
      },
    })
  })
}
