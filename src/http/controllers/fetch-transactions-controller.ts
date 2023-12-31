import { makeFetchTransactions } from '@/use-cases/factories/make-fetch-transacions'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function fetchTransactions(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const fetchQueryParams = z.object({
    page: z.string().default('1').transform(Number),
  })

  const queryParams = fetchQueryParams.parse(request.query)
  const { sub } = request.user

  if (isNaN(queryParams.page) || queryParams.page === 0) {
    return reply
      .code(400)
      .send({ message: 'Please send the page as number type.' })
  }

  try {
    const fetchtransactionsUseCase = makeFetchTransactions()
    const { transactions } = await fetchtransactionsUseCase.execute({
      page: queryParams.page,
      userId: sub,
    })

    const balance = transactions.reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.value
          acc.total += transaction.value
        } else {
          acc.outcome += transaction.value
          acc.total -= transaction.value
        }
        return acc
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )

    return reply.status(200).send({ transactions, balance })
  } catch (error) {}
}
