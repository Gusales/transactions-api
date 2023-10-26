import { NoHaveCreditsError } from '@/use-cases/errors/no-credits-found-error'
import { makeCreateNewTransaction } from '@/use-cases/factories/make-create-new-transaction'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function createNewTransaction(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const createNewTransactionSchema = z.object({
    title: z.string(),
    value: z.number().min(1),
    type: z.enum(['income', 'outcome']),
  })

  const { title, type, value } = createNewTransactionSchema.parse(request.body)

  const { sub } = request.user

  console.log(sub)

  try {
    const createNewTransactionUseCase = makeCreateNewTransaction()
    const { transaction } = await createNewTransactionUseCase.execute({
      title,
      type,
      value,
      userId: sub,
    })

    return reply.status(201).send({ transaction })
  } catch (error) {
    if (error instanceof NoHaveCreditsError) {
      return reply.status(400).send({ err: error.message })
    }
  }
}
