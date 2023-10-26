import { FastifyInstance } from 'fastify'
import { fetchTransactions } from '../controllers/fetch-transactions-controller'
import { createNewTransaction } from '../controllers/create-new-transaction-controller'

export async function transactionsRoutes(app: FastifyInstance) {
  app.addHook('preHandler', async (request) => {
    await request.jwtVerify()
  })

  app.get('/transactions', fetchTransactions)

  app.post('/transactions', createNewTransaction)
}
