import { InMemoryUserRepository } from '@/repositories/in-memory-repository/in-memory-user-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'
import { RegisterUseCase } from '@/use-cases/register'
import { compare } from 'bcryptjs'
import { it, expect, describe, beforeEach } from 'vitest'

describe('Register use case', () => {
  let registerRepository: InMemoryUserRepository
  let sut: RegisterUseCase
  beforeEach(() => {
    registerRepository = new InMemoryUserRepository()
    sut = new RegisterUseCase(registerRepository)
  })

  it('should be able to create a new user', async () => {
    const { user } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it(`should be able to encrypt the user's password before being registered`, async () => {
    const {
      user: { password },
    } = await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    const isPasswordCorrectlyEncrypted = await compare('123456', password)

    expect(isPasswordCorrectlyEncrypted).toBe(true)
  })

  it('should not be able to register with same email', async () => {
    await sut.execute({
      name: 'John Doe',
      email: 'johndoe@email.com',
      password: '123456',
    })

    expect(
      sut.execute({
        name: 'John Doe',
        email: 'johndoe@email.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
