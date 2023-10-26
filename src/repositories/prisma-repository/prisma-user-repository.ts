import { UserType } from '@/@types/UserType'
import { UserRepository } from '../user-repository'
import { prisma } from '@/lib/prisma'

export class PrismaUserRepository implements UserRepository {
  async create(data: UserType) {
    const user = await prisma.user.create({
      data,
    })

    return user
  }

  async findById(id: string) {
    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    })

    return user
  }

  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
