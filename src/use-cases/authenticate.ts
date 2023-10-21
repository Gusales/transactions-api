import { UserType } from '@/@types/UserType'
import { UserRepository } from '@/repositories/user-repository'
import { compare } from 'bcryptjs'
import { CredentialsError } from './errors/credentials-error'

interface AuthenticateUseCaseRequest {
  email: string
  password: string
}
interface AuthenticateUseCaseResponse {
  user: UserType
}

export class AuthenticateUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new CredentialsError()
    }

    const doesPasswordMatches = await compare(password, user.password)

    if (!doesPasswordMatches) {
      throw new CredentialsError()
    }

    return { user }
  }
}
