import { InMemoryUserRepository } from '@/repositories/in-memory-repository/in-memory-user-repository'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { CredentialsError } from '@/use-cases/errors/credentials-error'
import { hash } from 'bcryptjs'
import { randomUUID } from 'node:crypto'
import { describe, it, expect, beforeEach } from 'vitest'

describe('Authenticate use case', () => {
  let userRepository: InMemoryUserRepository
  let sut: AuthenticateUseCase

  beforeEach(() => {
    userRepository = new InMemoryUserRepository()
    sut = new AuthenticateUseCase(userRepository)
  })

  it('should be able to authenticate', async () => {
    await userRepository.create({
      id: randomUUID(),
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      password: await hash('123456', 8),
    })

    const { user } = await sut.execute({
      email: 'johndoe@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate using wrong email', async () => {
    await userRepository.create({
      id: randomUUID(),
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      password: await hash('123456', 8),
    })

    expect(async () => {
      await sut.execute({
        email: 'johndoe@outlook.com',
        password: '123456',
      })
    }).rejects.toBeInstanceOf(CredentialsError)
  })

  it('should not be able to authenticate using wrong password', async () => {
    await userRepository.create({
      id: randomUUID(),
      email: 'johndoe@gmail.com',
      name: 'John Doe',
      password: await hash('123456', 8),
    })

    expect(async () => {
      await sut.execute({
        email: 'johndoe@gmail.com',
        password: '1234567',
      })
    }).rejects.toBeInstanceOf(CredentialsError)
  })
})
