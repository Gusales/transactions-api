import { PrismaTransactionsRepository } from '@/repositories/prisma-repository/prisma-transactions-repository'
import { CreateNewTransactionUseCase } from '../create-transactions'
import { PrismaUserRepository } from '@/repositories/prisma-repository/prisma-user-repository'

export function makeCreateNewTransaction() {
  const transactionsRepository = new PrismaTransactionsRepository()
  const userRepository = new PrismaUserRepository()
  const createNewTransactionsUseCase = new CreateNewTransactionUseCase(
    transactionsRepository,
    userRepository,
  )

  return createNewTransactionsUseCase
}
