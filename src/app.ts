import fastify from 'fastify'

import cors from '@fastify/cors'
import jwt from '@fastify/jwt'

import { env } from './env'

import { userRoutes } from './http/routes/user.routes'
import { transactionsRoutes } from './http/routes/transactions.routes'

export const app = fastify()

app.register(cors, {
  origin: '*',
})

app.register(jwt, {
  secret: env.JWT_SECRET ?? '',
})

app.register(userRoutes)
app.register(transactionsRoutes)
