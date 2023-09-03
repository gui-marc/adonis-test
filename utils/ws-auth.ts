import Database from '@ioc:Adonis/Lucid/Database'
import SocketErrors from 'App/Exceptions/SocketErrors'
import User from 'App/Models/User'
import crypto from 'node:crypto'
import { Socket } from 'socket.io'

function urlDecode(encoded) {
  return Buffer.from(encoded, 'base64').toString('utf-8')
}

function generateHash(token) {
  return crypto.createHash('sha256').update(token).digest('hex')
}

function parseToken(token) {
  const parts = token.split('.')
  console.log({ parts })
  /**
   * Ensure the token has two parts
   */
  if (parts.length !== 2) {
    throw new Error('E_INVALID_API_TOKEN')
  }

  /**
   * Ensure the first part is a base64 encode id
   */
  const tokenId = urlDecode(parts[0])

  if (!tokenId) {
    throw new Error('E_INVALID_API_TOKEN')
  }

  const parsedToken = generateHash(parts[1])
  return {
    token: parsedToken,
    tokenId,
  }
}

async function checkToken(token: string): Promise<User> {
  const parsedToken = parseToken(token)

  const { user_id: userId } = await Database.from('api_tokens')
    .select('user_id')
    .where('id', parsedToken.tokenId)
    .andWhere('token', parsedToken.token)
    .first()

  if (!userId) {
    throw new Error('E_INVALID_API_TOKEN')
  }

  const user = await User.find(userId)

  if (!user) {
    throw new Error('E_INVALID_API_TOKEN')
  }

  return user
}

export async function authenticateSocket(socket: Socket): Promise<User> {
  const token = socket.handshake?.query?.token

  if (!token || typeof token !== 'string') {
    throw new Error(SocketErrors.MissingParameter)
  }

  try {
    const user = await checkToken(token)
    return user
  } catch (error) {
    throw new Error(SocketErrors.BadCredentials)
  }
}
