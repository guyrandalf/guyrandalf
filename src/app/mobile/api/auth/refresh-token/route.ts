import { NextRequest, NextResponse } from 'next/server'
import { verifyRefreshToken, signJwt } from '@/lib/jwt'

export async function POST(request: NextRequest) {
  try {
    const { refreshToken } = await request.json()
    
    if (!refreshToken) {
      return NextResponse.json(
        { error: 'Refresh token required' },
        { status: 400 }
      )
    }

    const payload = verifyRefreshToken(refreshToken)
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid refresh token' },
        { status: 401 }
      )
    }

    const tokens = signJwt({
      userId: payload.userId,
      email: payload.email,
      name: payload.name
    })

    return NextResponse.json({
      message: 'Token refreshed successfully',
      ...tokens
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to refresh token' },
      { status: 500 }
    )
  }
}