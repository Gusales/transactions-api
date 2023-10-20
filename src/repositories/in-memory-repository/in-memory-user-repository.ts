import { UserType } from '@/@types/UserType'
import { UserRepository } from '../user-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryUserRepository implements UserRepository {
  public Users: UserType[] = []
  async create(data: UserType) {
    const user: UserType = {
      id: randomUUID(),
      email: data.email,
      name: data.name,
      password: data.password,
    }

    this.Users.push(user)
    return user
  }

  async findById(id: string) {
    const user = this.Users.find((item) => item.id === id)
    if (!user) {
      return null
    }
    return user
  }

  async findByEmail(email: string) {
    const user = this.Users.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }
}
