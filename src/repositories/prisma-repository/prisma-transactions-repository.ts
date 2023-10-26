import { TransactionsType } from '@/@types/TransactionsTypes'
import { TransactionsRepository } from '../transactions-repository'
import { prisma } from '@/lib/prisma'

export class PrismaTransactionsRepository implements TransactionsRepository {
  async create(data: TransactionsType) {
    const newTransaction = await prisma.transactions.create({
      data: {
        title: data.title,
        type: data.type,
        value: data.value,
        user: {
          connect: {
            id: data.userId,
          },
        },
      },
    })
    return newTransaction
  }

  async findManyByUserId(id: string) {
    return await prisma.transactions.findMany({
      where: {
        user: {
          id,
        },
      },
    })
  }

  async findByUserId(userId: string, page: number) {
    const transactions = await prisma.transactions.findMany({
      where: {
        userId,
      },
      take: 20 * page,
    })

    return transactions
  }
}
