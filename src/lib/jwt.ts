import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET ?? 'null'
const REFRESH_SECRET = process.env.REFRESH_SECRET ?? 'null'

interface TokenResponse {
  accessToken: string
  refreshToken: string
}

export function signJwt(payload: object): TokenResponse {
  return {
    accessToken: jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' }),
    refreshToken: jwt.sign(payload, REFRESH_SECRET, { expiresIn: '30d' })
  }
}

export function verifyJwt(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET) as jwt.JwtPayload
  } catch {
    return null
  }
}

export function verifyRefreshToken(token: string) {
  try {
    return jwt.verify(token, REFRESH_SECRET) as jwt.JwtPayload
  } catch {
    return null
  }
}