import { PrismaTransactionsRepository } from '@/repositories/prisma-repository/prisma-transactions-repository'
import { FetchTransactionsUseCase } from '../fetch-transactions'
import { PrismaUserRepository } from '@/repositories/prisma-repository/prisma-user-repository'

export function makeFetchTransactions() {
  const transactionsRepository = new PrismaTransactionsRepository()
  const userRepository = new PrismaUserRepository()
  const fetchTransactionsUseCase = new FetchTransactionsUseCase(
    transactionsRepository,
    userRepository,
  )

  return fetchTransactionsUseCase
}
