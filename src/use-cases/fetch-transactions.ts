import { TransactionsType } from '@/@types/TransactionsTypes'
import { TransactionsRepository } from '@/repositories/transactions-repository'
import { UserRepository } from '@/repositories/user-repository'
import { ResourceNotFoundError } from './errors/resorce-not-found-error'

interface FetchTransactionsRequest {
  userId: string
  page: number
}

interface FetchTransactionsResponse {
  transactions: TransactionsType[]
}

export class FetchTransactionsUseCase {
  constructor(
    private transactionsRepository: TransactionsRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    userId,
    page,
  }: FetchTransactionsRequest): Promise<FetchTransactionsResponse> {
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
