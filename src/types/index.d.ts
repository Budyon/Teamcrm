import { Request, Response } from 'express'
import { JwtPayload } from 'jsonwebtoken'

declare global {
  namespace Express {
    interface Request {
      user?: Record<string, any>,
      token?: Record<string | JwtPayload>,
    }
  }
}

interface ServerToClientEvents {
  getMessage: (a: any) => void;
  getNotif: (a: any) => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  // getMessage: () => (a: number, b: string, c: Buffer) => void;
  // getNotif: () => (a: number, b: string, c: Buffer) => void;
}
interface ClientToServerEvents {
  hello: () => void;
}

interface InterServerEvents {
  ping: () => void;
}

interface SocketData {
  name: string;
  age: number;
}