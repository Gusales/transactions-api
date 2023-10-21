import { randomUUID } from 'node:crypto'
import { it, expect, describe, beforeEach } from 'vitest'

import { InMemoryTransactionsRepository } from '@/repositories/in-memory-repository/in-memory-transactions-repository'
import { ListTransactions } from '@/use-cases/list-transactions'
import { InMemoryUserRepository } from '@/repositories/in-memory-repository/in-memory-user-repository'

describe('List transactions use case', () => {
  let transactionRepository: InMemoryTransactionsRepository
  let userRepository: InMemoryUserRepository
  let sut: ListTransactions
  beforeEach(() => {
    transactionRepository = new InMemoryTransactionsRepository()
    userRepository = new InMemoryUserRepository()
    sut = new ListTransactions(transactionRepository, userRepository)
  })

  it('should be able to list a all user transactions', async () => {
    const { id } = await userRepository.create({
      id: randomUUID(),
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    await transactionRepository.create({
      title: 'Cadeira gamer',
      type: 'outcome',
      userId: id,
      value: 1200,
    })

    await transactionRepository.create({
      title: 'Salário',
      type: 'income',
      userId: id,
      value: 3000,
    })

    const { transactions } = await sut.execute({
      userId: id,
    })

    expect(transactions.length).toEqual(2)
  })
})
