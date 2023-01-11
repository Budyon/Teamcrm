import { Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      user?: Record<string,any>,
      token?: Record<string | JwtPayload>,
    }
  }
}
