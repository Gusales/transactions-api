import { randomUUID } from 'node:crypto'
import { it, expect, describe, beforeEach } from 'vitest'

import { InMemoryTransactionsRepository } from '@/repositories/in-memory-repository/in-memory-transactions-repository'
import { CreateNewTransactionUseCase } from '@/use-cases/create-transactions'
import { InMemoryUserRepository } from '@/repositories/in-memory-repository/in-memory-user-repository'

describe('Register use case', () => {
  let transactionRepository: InMemoryTransactionsRepository
  let userRepository: InMemoryUserRepository
  let sut: CreateNewTransactionUseCase
  beforeEach(() => {
    transactionRepository = new InMemoryTransactionsRepository()
    userRepository = new InMemoryUserRepository()
    sut = new CreateNewTransactionUseCase(transactionRepository)
  })

  it('should be able to create a new transactions', async () => {
    const { id } = await userRepository.create({
      id: randomUUID(),
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    const { transaction } = await sut.execute({
      title: 'Cadeira Gamer',
      value: 1200,
      type: 'outcome',
      userId: id,
    })

    expect(transaction.id).toEqual(expect.any(String))
  })

  // it(`should be able to encrypt the user's password before being registered`, async () => {})

  // it('should not be able to register with same email', async () => {})
})
