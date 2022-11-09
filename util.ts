import jwt, { Secret, JwtPayload } from 'jsonwebtoken'
import { sign,verify } from "jsonwebtoken"
import { User } from "./src/schema/userSchema"
import { Request, Response,NextFunction } from 'express'
import endpoint from './endpoints.config'
import { Role } from './src/schema/roleSchema'
import nodemailer from 'nodemailer'

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

export interface CustomRequest extends Request {
 token: string | JwtPayload
}

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  
 try {
   const token = req.header('Authorization')?.replace('Bearer ', '');

   if (!token) {
     throw new Error();
   }
   
   const decoded = verify(token, SECRET_KEY);
 
   (req as CustomRequest).token = decoded

   next();
 } catch (err) {
   res.status(401).send('Please authenticate');
 }
};


export async function main() {
  let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "23284279f95fc8",
      pass: "b62a5e30670c59"
    }
  })

let info = await transporter.sendMail({
  from: '"Sender Name" <from@cloudmta.com>',
  to: "budyonevistep@gmail.com",
  subject: "Hello from node",
  text: "Hello world?",
  html: "<strong>Hello world?</strong>",
  headers: { 'x-cloudmta-class': 'standard' }
})

console.log("Message sent: %s", info.response)
}