import { TransactionsType } from '@/@types/TransactionsTypes'

export interface TransactionsRepository {
  create: (data: TransactionsType) => Promise<TransactionsType>
  findByUserId: (id: string) => Promise<TransactionsType[]>
}