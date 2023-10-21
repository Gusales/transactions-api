import { TransactionsType } from '@/@types/TransactionsTypes'
import { TransactionsRepository } from '@/repositories/transactions-repository'
import { UserRepository } from '@/repositories/user-repository'
import { ResourceNotFoundError } from './errors/resorce-not-found-error'
import { NoHaveCreditsError } from './errors/no-credits-found-error'

interface CreateNewTransactionUseCaseRequest {
  title: string
  value: number
  type: 'income' | 'outcome'
  userId: string
}

interface CreateNewTransactionUseCaseResponse {
  transaction: TransactionsType
}

export class CreateNewTransactionUseCase {
  constructor(
    private transactionsRepository: TransactionsRepository,
    private userRepository: UserRepository,
  ) {}

  async execute({
    title,
    type,
    value,
    userId,
  }: CreateNewTransactionUseCaseRequest): Promise<CreateNewTransactionUseCaseResponse> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new ResourceNotFoundError()
    }
    const balance = (
      await this.transactionsRepository.findByUserId(userId)
    ).reduce(
      (acc, transaction) => {
        if (transaction.type === 'income') {
          acc.income += transaction.value
          acc.total += transaction.value
        } else {
          acc.outcome += transaction.value
          acc.total -= transaction.value
        }
        return acc
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    )

    if (type === 'outcome' && balance.total < value) {
      throw new NoHaveCreditsError()
    }

    const newTransaction = await this.transactionsRepository.create({
      title,
      type,
      userId: user.id,
      value,
    })

    return { transaction: newTransaction }
  }
}
