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
import { UserDto } from '../dto/user/UserDto'
import { UserToken } from '../schema/userTokenSchema'
const router  = express.Router()

router.post('/register',upload.single('photo'),
body('firstname').isString(),
body('lastname').isString(),
body('email').isEmail(),
body('password').isString(),
 async (req: Request<{}, {}>, res: Response) => {
  
  try {
    const { firstname, lastname, email, password } = req.body
    
    const oldUser = await User.findOne({ email })

    const errors = validationResult(req)
        
    if (!errors.isEmpty()) {
        return res.status(400).json({ message: errors })
    }
                
    if (!(email && password && firstname && lastname)) {
      res.status(400).json({ error:"All input is required" })
    }

    if (oldUser) {
      return res.status(400).json("Email Already Exist")
    }
    
    const encryptedPassword = await bcrypt.hash(password, 10)

    const updated = req.body
            
    if (req.file && req.file.path) {
        updated.photo = 'http://localhost:3004/uploads/' + req.file?.filename
    }
    
    const user = await User.create({
      ...updated,
      password: encryptedPassword,
    })

    const accessToken = generateAccessToken({ user_id: user.id })
    const refreshToken = sign({ user_id: user.id }, endpoint.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
            
    await UserToken.create({
      userId: user.id,
      token: refreshToken
    })
    res.status(201).json({
      data: new UserDto(user),
      accessToken,
      refreshToken,
    })
  } catch (err) {
    res.status(404).json(err)
  }
})

router.post('/login',
body('email').isEmail(),
body('password').isString(),
async(req: Request, res: Response) => {

  try {
      const { email, password } = req.body
  
      if (!(email && password)) {
        res.status(400).json("All input is required")
      }
      const user = await User.findOne({ email })
      
      if(!user) {
        res.status(401).json({
          message:'User not found'
        })
      }
      
      if(user) {
        bcrypt.compare(password, user.password, async function(err, result) {
          
          if(result) {  
              const accessToken = generateAccessToken({ user_id: user.id })
              
              const refreshToken = sign({
                user_id: user.id,
            }, endpoint.REFRESH_TOKEN_SECRET, { expiresIn: '1d' })
              const checkUserToken = await UserToken.findOne({userId:user.id})
            
              if(checkUserToken === null) {
                
                await UserToken.create({
                  userId: user.id,
                  token: refreshToken
                })
              }

              await user.populate({
                path: 'company',
                model: 'Company',
                select: 'id name logo'
              })

              res.status(200).json({
                  ...new UserDto(user),
                  accessToken,
                  refreshToken
              })
          }else {
              return  res.status(401).json({
                 message:'Password Invalid'
               })
          }
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
              return res.status(403).json({ message: 'Unauthorized' })
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

router.post("/logout",auth,async (req,res) => {
  try {
    const authHeader = req.header('Authorization')?.replace('Bearer ', '') || ''
    const decoded = verify(authHeader, endpoint.ACCESS_TOKEN_SECRET) as JwtPayload
    UserToken.findOneAndDelete({ token:req.body.refreshToken }, function (err: any, docs: any) {
      if (err){
        return res.status(403).json( { error:'Unauthorized' } )
      }
      return res.status(200).json({
        message:'User Successfully Logout'
      })
    })
  } catch (error) {
    res.status(401).json({
      error:'User not defined'
    })
  }
})

export { router as AuthRouter }