import { randomUUID } from 'node:crypto'
import { it, expect, describe, beforeEach } from 'vitest'

import { InMemoryTransactionsRepository } from '@/repositories/in-memory-repository/in-memory-transactions-repository'
import { FetchTransactionsUseCase } from '@/use-cases/fetch-transactions'
import { InMemoryUserRepository } from '@/repositories/in-memory-repository/in-memory-user-repository'

describe('List transactions use case', () => {
  let transactionRepository: InMemoryTransactionsRepository
  let userRepository: InMemoryUserRepository
  let sut: FetchTransactionsUseCase
  beforeEach(() => {
    transactionRepository = new InMemoryTransactionsRepository()
    userRepository = new InMemoryUserRepository()
    sut = new FetchTransactionsUseCase(transactionRepository, userRepository)
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
      page: 1,
    })

    expect(transactions.length).toEqual(2)
  })

  it('should be able to list all user transactions paginated', async () => {
    const { id } = await userRepository.create({
      id: randomUUID(),
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    for (let i = 0; i < 30; i++) {
      await transactionRepository.create({
        title: 'Cadeira gamer',
        type: 'outcome',
        userId: id,
        value: 1200,
      })
    }

    const page1 = await sut.execute({
      userId: id,
      page: 1,
    })

    const page2 = await sut.execute({
      userId: id,
      page: 2,
    })

    expect(page1.transactions.length).toEqual(20)

    expect(page2.transactions.length).toEqual(10)
  })
})
