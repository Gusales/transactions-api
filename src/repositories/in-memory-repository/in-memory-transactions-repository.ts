import { randomUUID } from 'node:crypto'
import { TransactionsType } from '@/@types/TransactionsTypes'
import { TransactionsRepository } from '../transactions-repository'

export class InMemoryTransactionsRepository implements TransactionsRepository {
  public transactions: TransactionsType[] = []
  async create(data: TransactionsType) {
    const newTransaction: TransactionsType = {
      id: randomUUID(),
      title: data.title,
      value: data.value,
      type: data.type,
      userId: data.userId,
    }

    this.transactions.push(newTransaction)
    return newTransaction
  }

  async findManyByUserId(id: string) {
    return this.transactions.filter((item) => item.userId === id)
  }

  async findByUserId(userId: string, page: number) {
    const transactions = this.transactions
      .filter((item) => item.userId === userId)
      .slice((page - 1) * 20, page * 20)

    return transactions
  }
}
