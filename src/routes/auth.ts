import express from 'express'
import  { User }  from '../schema/userSchema'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import { generateAccessToken } from '../util'
import { upload } from '../util'
import { JwtPayload, sign, verify } from 'jsonwebtoken'
import endpoint from '../endpoints.config'
import { auth } from "../util"
import { body, validationResult } from 'express-validator'

const router  = express.Router()

router.post('/register',upload.single('photo'),
body('firstname').isString(),
body('lastname').isString(),
body('email').isEmail(),
body('password').isString(),
 async (req: Request<{}, {}>, res: Response) => {
  
  try {
    const { firstname, lastname, email, password } = req.body
    console.log(typeof(firstname))
    
    const oldUser = await User.findOne({ email })

    const errors = validationResult(req)
        
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
    }
                
    if (!(email && password && firstname && lastname)) {
      res.status(400).json({ error:"All input is required" })
    }

    if (oldUser) {
      return res.status(400).json("Email Already Exist")
    }
    
    const encryptedPassword = await bcrypt.hash(password, 10)
    
    const user = await User.create({
      firstname,
      lastname,
      photo:req.file?.path,
      email: email.toLowerCase(),
      password: encryptedPassword,
    })

    const accessToken = generateAccessToken({ user_id: user.id })
    const refreshToken = sign({ user_id: user.id }, endpoint.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
            
    res.status(201).json({
      user,
      accessToken,
      refreshToken
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
      console.log(user)
      
      if(user) {
        bcrypt.compare(password, user.password, async function(err, result) {
          if(err) {
            res.status(400).json(err)
          }

          if(result) {            
              const accessToken = generateAccessToken({ user_id: user.id })
              const refreshToken = sign({
                user_id: user.id,
            }, endpoint.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })

            await User.findByIdAndUpdate(user._id,{
              refreshtoken:refreshToken
            })

              res.status(201).json({
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
      }else {
        res.status(401).json({
          err:'User not found '
        })
      }
  } catch (error) {
    res.status(401).json(error)
  }
})

router.post('/refresh', (req, res) => {
  const refreshToken = req.headers?.jwt

  if (refreshToken && typeof refreshToken === 'string') {
      
      verify(refreshToken, endpoint.REFRESH_TOKEN_SECRET,
      (err:any, decoded:any) => {
          if (err) {
              return res.status(401).json({ message: 'Unauthorized' })
          }
          else {
              const accessToken = generateAccessToken({ user_id: decoded.user_id })
              return res.json({ accessToken })
          }
      })
  } else {
      return res.status(401).json({ message: 'Unauthorized' })
  }
})

router.get("/logout",auth,async (req,res)=> {

  try {
    const authHeader = req.header('Authorization')?.replace('Bearer ', '') || ''
    const decoded = verify(authHeader, endpoint.ACCESS_TOKEN_SECRET) as JwtPayload


    await User.findByIdAndUpdate(decoded.user_id,{
      refreshtoken: ''
    })
    res.status(200).json({
      message:'User Successfully Logout'
    })
  } catch (error) {
    res.status(400).json({
      error:'User not defined'
    })
  }
})

// console.log(decode?.token,'2')

  
  // verify(authHeader, router.get('superSecret'), function(err, decoded) {      
  //     if (err) {
  //       return res.json({ success: false, message: 'Failed to authenticate token.' });    
  //     } else {
  //       req.decoded = decoded
  //       console.log(decoded)
  //       next()
  //     }

export { router as AuthRouter }