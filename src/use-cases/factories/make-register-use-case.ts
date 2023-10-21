import { InMemoryUserRepository } from '@/repositories/in-memory-repository/in-memory-user-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const userRepository = new InMemoryUserRepository()
  const registerUseCase = new RegisterUseCase(userRepository)

  return registerUseCase
}
