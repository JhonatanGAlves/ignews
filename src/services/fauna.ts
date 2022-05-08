// Para ter acesso ao banco de dados.

import { Client } from "faunadb"

export const client = new Client({
  secret: process.env.FAUNADB_KEY
})