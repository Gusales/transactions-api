import { UserType } from '@/@types/UserType'
import { UserRepository } from '@/repositories/user-repository'
import { hash } from 'bcryptjs'

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
      throw new Error('User already exists.')
    }

    const user = await this.userRepository.create({
      email,
      name,
      password: password_hash,
    })

    return { user }
  }
}
