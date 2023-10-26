export type TransactionsType = {
  id?: string
  title: string
  value: number
  type: 'outcome' | 'income'
  userId?: string
}
