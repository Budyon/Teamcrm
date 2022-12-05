import express from 'express'
import  { User }  from '../schema/userSchema'
import bcrypt from 'bcrypt'
import path from 'path'
import { Request, Response } from 'express'
import { generateAccessToken } from '../util'
import multer from 'multer'
import {v4 as uuidv4} from 'uuid'

const router  = express.Router()

const userStorage = multer.diskStorage({   
    destination: function(req, file, cb) {
       cb(null, path.resolve('./src/storage/user'))
    }, 
    filename: function (req, file, cb) {
        const type = file.originalname.split(".")
        cb(null, uuidv4() + "." + type[1])
    }
})
const upload = multer({
    storage: userStorage,
    limits : {fileSize : 1000000}
})

router.post('/register',upload.single('photo'),
 async (req: Request<{}, {}>, res: Response) => {
    
  try {
    const { firstName, lastName, email, password } = req.body
    const oldUser = await User.findOne({ email })
                
    if (!(email && password && firstName && lastName)) {
      res.status(400).send("All input is required")
    }
    
    if (oldUser) {
      return res.status(409).json("Email Already Exist. Please Login")
    }

    const encryptedPassword = await bcrypt.hash(password, 10)

    const user = await User.create({
      firstName,
      lastName,
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
          if(err){
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