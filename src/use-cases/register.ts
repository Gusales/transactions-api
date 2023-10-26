import { randomUUID } from 'node:crypto'
import { UserType } from '@/@types/UserType'
import { UserRepository } from '@/repositories/user-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUseCaseRequest {
  email: string
  name: string
  password: string
}

interface RegisterUseCaseResponse {
  user: UserType
}

export class RegisterUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    name,
    password,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 8)

    const userWithSameEmail = await this.userRepository.findByEmail(email)
    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const user = await this.userRepository.create({
      id: randomUUID(),
      email,
      name,
      password: password_hash,
    })

    return { user }
  }
}
