import { Secret, JwtPayload, } from 'jsonwebtoken'
import { sign,verify } from "jsonwebtoken"
import { Request, Response, NextFunction } from 'express'
import endpoint from '../endpoints.config'
import { Role } from './schema/roleSchema'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import multer from 'multer'

export const Storage = multer.diskStorage({   
  destination: function(req, file, cb) {
    if(req.url === '/register') {
      cb(null, path.resolve('./src/storage/user'))
    }else {
      cb(null, path.resolve('./src/storage/project'))
    }
  },
  filename: function (req, file, cb) {
      const type = file.originalname.split(".")
      cb(null, uuidv4() + "." + type[1])
  }
})

export const upload = multer({
  storage: Storage,
  limits : { fileSize : 1000000 }
})

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
      endpoint.ACCESS_TOKEN_SECRET,
      {  expiresIn: '24h' }
    )
}

export const SECRET_KEY: Secret = endpoint.ACCESS_TOKEN_SECRET

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '')

   if (!token) {
     throw new Error()
   }
   
   const decoded = verify(token, SECRET_KEY)
 
   req.token = decoded as JwtPayload

   next()
 } catch (err) {
    res.status(401).send('Please authenticate')
  }
}


