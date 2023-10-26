import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { env } from '@/env'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { CredentialsError } from '@/use-cases/errors/credentials-error'

export async function authenticateController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateUserSchema = z.object({
    email: z.string().email(),
    password: z.string(),
  })

  const authenticateUserBody = authenticateUserSchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()
    const { user } = await authenticateUseCase.execute({
      email: authenticateUserBody.email,
      password: authenticateUserBody.password,
    })

    const token = await reply.jwtSign(
      {
        user: {
          email: user.email,
        },
      },
      {
        sub: user.id,
        expiresIn: 60 * 60 * 24 * 30 /* 1 month */,
      },
    )

    return reply.status(200).send({ token })
  } catch (err) {
    if (err instanceof CredentialsError) {
      return reply.status(400).send({ mensage: err.message })
    }
  }
}
