import express from 'express'
import  { User }  from '../schema/userSchema'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { generateAccessToken } from '../util'
import { upload } from '../util'

const router  = express.Router()

router.post('/register',upload.single('photo'),
 async (req: Request<{}, {}>, res: Response) => {
    
  try {
    const { firstname, lastname, email, password } = req.body
    const oldUser = await User.findOne({ email })
                
    if (!(email && password && firstname && lastname)) {
      res.status(400).send("All input is required")
    }

    if (oldUser) {
      return res.status(409).json("Email Already Exist. Please Login")
    }
    console.log(req.file?.path.slice(7))
    
    const encryptedPassword = await bcrypt.hash(password, 10)
    console.log(req.file)
    const user = await User.create({
      firstname,
      lastname,
      photo:req.file?.path,
      email: email.toLowerCase(),
      password: encryptedPassword,
    })
    
    res.status(201).json(user)
  } catch (err) {
    console.log(err)
  }
})

router.post('/login', async(req: Request, res: Response) => {
  try {
      const { email, password } = req.body
  
      if (!(email && password)) {
        res.status(400).json("All input is required")
      }
      const user = await User.findOne({ email })
      
      if(user) {
        bcrypt.compare(password, user.password, function(err, result) {
          if(err) {
            console.log(err)
          }
          if(result) {            
              const token = generateAccessToken({user_id: user.id})
              res.json({
                  user,
                  token,
              })
          }else {
            res.json({
              error:"Invalid password"
            })
          }
      })       
    } 
  } catch (error) {
    console.log(error, 'error')
    
    res.status(401).json(error)
  }
})




export { router as AuthRouter}