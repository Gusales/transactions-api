import { UserType } from '@/@types/UserType'

export interface UserRepository {
  create: (data: UserType) => Promise<UserType>
  findById: (id: string) => Promise<UserType | null>
  findByEmail: (email: string) => Promise<UserType | null>
}
