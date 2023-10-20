import { UserType } from '@/@types/UserType'
import { UserRepository } from '../user-repository'
import { randomUUID } from 'node:crypto'

export function InMemoryUserRepository(): UserRepository {
  const users: UserType[] = []

  async function create(data: UserType) {
    const user: UserType = {
      id: randomUUID(),
      name: data.name,
      email: data.email,
      password: data.password,
    }

    users.push(user)
    return user
  }

  async function findById(id: string) {
    const user = users.find((item) => item.id === id)

    if (!user) {
      return null
    }

    return user
  }

  async function findByEmail(email: string) {
    const user = users.find((item) => item.email === email)
    if (!user) {
      return null
    }
    return user
  }

  return {
    create,
    findById,
    findByEmail,
  }
}
