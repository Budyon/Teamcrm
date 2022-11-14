import express from 'express'
import { json } from 'body-parser'
import  { User }  from '../schema/userSchema'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { generateAccessToken } from '../util'

const router  = express.Router()

router.use(json())

router.post('/register', async (req: Request<{}, {}>, res: Response) => {
    
  try {
    const { firstName, lastName, email, password, photo } = req.body
                  
    if (!(email && password && firstName && lastName)) {
      res.status(400).send("All input is required")
    }

    const oldUser = await User.findOne({ email })

    if (oldUser) {
      return res.status(409).json("User Already Exist. Please Login")
    }

    const encryptedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      firstName,
      lastName,
      photo,
      role:undefined,
      email: email.toLowerCase(), 
      password: encryptedPassword,
    })
    
    res.status(201).send(user)
  } catch (err) {
    console.log(err)
  }
})

router.post('/login', async(req: Request, res: Response) => {
  try {
      const { email, password } = req.body
  
      if (!(email && password)) {
        res.status(400).send("All input is required")
      }
      const user = await User.findOne({ email })
      if(!!user) {
        const token = generateAccessToken({user_id: user.id})
        res.status(400).json({
          user,
          token,
        })
      }else {
        res.status(403).json({error:"User not defined"})
      }
      
            
    } catch (err) {
      console.log(err)
    }
})

export { router as AuthRouter}