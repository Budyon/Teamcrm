import express from 'express'
import { json } from 'body-parser'
import  jwt  from 'jsonwebtoken'
import  {User}  from '../schema/userSchema'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import endpoint from '../../endpoints.config'

const router  = express.Router()
router.use(json())


export { router as userRouter}