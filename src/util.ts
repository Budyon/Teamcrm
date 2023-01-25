import { JwtPayload, } from 'jsonwebtoken'
import { sign,verify } from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import endpoint from './endpoints.config'
import { Role } from './schema/roleSchema'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import multer from 'multer'
import { User } from './schema/userSchema'

export const Storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, path.resolve('./src/uploads'))
  },
  filename: function (req, file, cb) {
      const type = file.originalname.split(".")
      cb(null, `${uuidv4()}.${type[1]}`)
  }
})

export const upload = multer({
  dest: './storage/users', 
  storage: Storage,
  limits : { fileSize : 1000000000 }
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
  return sign(user, endpoint.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '')
   
      if (!token) {
        res.json({
        error:'Please authentication'
        })
      }else {
        const decoded = verify(token, endpoint.ACCESS_TOKEN_SECRET) as JwtPayload
        const user = await User.findById(decoded.user_id) as JwtPayload
    
      if(user.refreshtoken !== '') {
        req.token = decoded as JwtPayload
        next()
      } else {
          res.status(403).json({ error:'Please authenticate' })
        }
      }
  } catch (error) {
    res.status(400).json({
      error:error
    })
  }
}