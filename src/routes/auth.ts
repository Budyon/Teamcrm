import express from 'express'
import  { User }  from '../schema/userSchema'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { generateAccessToken } from '../util'
import { upload } from '../util'
import  jwt, { sign, verify } from 'jsonwebtoken' 
import endpoint from '../endpoints.config'

const router  = express.Router()

router.post('/register',upload.single('photo'),
 async (req: Request<{}, {}>, res: Response) => {
    
  try {
    const { firstname, lastname, email, password } = req.body
    const oldUser = await User.findOne({ email })
                
    if (!(email && password && firstname && lastname)) {
      res.status(400).json({error:"All input is required"})
    }

    if (oldUser) {
      return res.status(409).json("Email Already Exist. Please Login")
    }
    
    const encryptedPassword = await bcrypt.hash(password, 10)
    const user = await User.create({
      firstname,
      lastname,
      photo:req.file?.path,
      email: email.toLowerCase(),
      password: encryptedPassword,
    })
    const token = generateAccessToken({user_id: user.id})
              
    res.status(201).json({
      user,
      token
    })
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
              const accessToken = generateAccessToken({user_id: user.id})
              const refreshToken = jwt.sign({
                user_id: user.id,
            }, endpoint.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })

            res.cookie('jwt', refreshToken, {
              httpOnly: true, 
              sameSite: 'none',
              secure: true, 
              maxAge: 24 * 60 * 60 * 1000,
            });
  
              
              res.json({
                  user,
                  accessToken,
                  refreshToken
              })
          }else {
            res.json({
              error:"Invalid password"
            })
          }
      })       
    } 
  } catch (error) {
    res.status(401).json(error)
  }
})

// router.get("/logout",(req,res)=>{
//   const authHeader = req.headers["authorization"]
//   sign(authHeader,  { expiresIn: 1 } , (logout:Boolean, err) => {
//       if (logout) {
//         res.json({message : 'You have been Logged Out' })
//       }
//       if(err) {
//           res.json({message:'Error'})
//       }
//   })
// })

export { router as AuthRouter}