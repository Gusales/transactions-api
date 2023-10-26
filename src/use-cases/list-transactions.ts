import { TransactionsType } from '@/@types/TransactionsTypes'
import { TransactionsRepository } from '@/repositories/transactions-repository'
import { UserRepository } from '@/repositories/user-repository'
import { ResourceNotFoundError } from './errors/resorce-not-found-error'

interface ListTransactionsRequest {
  userId: string
  page: number
}

interface ListTransactionsResponse {
  transactions: TransactionsType[]
}

export class ListTransactions {
  constructor(
    private transactionsRepository: TransactionsRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    userId,
    page,
  }: ListTransactionsRequest): Promise<ListTransactionsResponse> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new ResourceNotFoundError()
    }

    const transactions = await this.transactionsRepository.findByUserId(
      userId,
      page,
    )

    return { transactions }
  }
}
