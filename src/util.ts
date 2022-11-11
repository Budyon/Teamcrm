import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import { sign,verify } from "jsonwebtoken"
import { User } from "./schema/userSchema"
import { Request, Response, NextFunction } from 'express'
import endpoint from '../endpoints.config'
import { Role } from './schema/roleSchema'

export  function createRole()  {
    const arr = ["Product manager","Company owner","Project manager","Executive manager"]
    arr.forEach(async element => {
        await Role.create({
            name:element
        })
    })
}

export function generateAccessToken(user:any) {
    return sign(
      user,
      endpoint.TOKEN,
      {  expiresIn: '1800s' }
    )
}

export const SECRET_KEY: Secret = endpoint.TOKEN;

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '');

   if (!token) {
     throw new Error()
   }
   
   const decoded = verify(token, SECRET_KEY);
 
   req.token = decoded as JwtPayload

   next();
 } catch (err) {
   res.status(401).send('Please authenticate');
 }
};


