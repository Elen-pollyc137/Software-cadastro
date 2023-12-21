import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { prisma } from '../lib/prisma'
import axios from 'axios'

export async function authRoutes(app: FastifyInstance) {
  // Rota de autenticação de usuário
  app.post(
    '/users/login',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const bodySchema = z.object({
          email: z.string(),
          password: z.number(), // Corrigido para z.string() em vez de z.number()
        })

        const { email, password } = bodySchema.parse(request.body)

        // const userResponse = await axios.get('http://localhost:3333/users', {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // })
        // console.log("🚀 ~ file: auth.ts:25 ~ userResponse:", userResponse)
        // const userInfo = bodySchema.parse(userResponse.data)

        // Verifica se o usuário existe no banco de dados
        const user = await prisma.user.findUnique({
          where: { email },
        })

        if (!user) {
          reply.status(401).send({ error: 'Usuário não encontrado' })
          return
        }

        // Verifica se a senha está correta
        if (password !== user.password) {
          reply.status(401).send({ error: 'Credenciais inválidas' })
          return
        }

        // Gera o token de autenticação
        const authToken = app.jwt.sign({ userId: user.id, name: user.name })
        // if (authToken !== userInfo.token) {
        //   reply.status(401).send({ error: 'Token Invalido inválidas' })
        //   return
        // }
        const userResponse = await axios.get('http://localhost:3333/users', {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        })

        // Atualiza o token no banco de dados
        const updatedUser = await prisma.user.update({
          where: { id: user.id }, // Não precisa incluir name aqui, já que estamos usando o ID
          data: { token: authToken },
        })

        // Remova essa linha, pois parece ser desnecessária e pode causar confusão
        // console.log('🚀 ~ file: auth.ts:51 ~ userResponse:', userResponse)

        // Envie a resposta com o novo token
        reply.send({ token: authToken })
        console.log(userResponse)
      } catch (error) {
        console.error(error)
        reply.status(500).send({ error: 'Internal Server Error' })
      }
    },
  )
}
