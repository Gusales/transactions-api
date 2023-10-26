import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

import { env } from '@/env'

import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'

export async function registerController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    email: z.string().email(),
    name: z.string(),
    password: z.string(),
  })

  const { email, name, password } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()
    const { user } = await registerUseCase.execute({
      email,
      name,
      password,
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

    return reply.code(201).send({ token })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ mensage: err.message })
    }

    throw err
  }
}
