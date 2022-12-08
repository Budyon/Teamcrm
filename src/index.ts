import mongoose from 'mongoose'
import express from 'express'
import { urlencoded,json } from "body-parser"
import { AuthRouter } from "./routes/auth"
import  session  from 'express-session'
import cors from 'cors'
import * as dotenv from 'dotenv'
import endpoint from './endpoints.config'
import { auth } from "./util"
import { userRouter } from "./routes/user" 
import { companyRouter } from "./routes/company"
import { createRole } from './util'
import { inviteRouter } from './routes/invite'
import { projectRouter } from './routes/project' 
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';

import { generateAccessToken } from './util'
const app  = express()

app.use(cors())
app.use(session({
  secret: endpoint.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser());

console.log(cookieParser());


app.use(AuthRouter)
app.use("/api/v1/auth", AuthRouter)
app.use("/api/v1/user",auth,userRouter)
app.use('/api/v1/companies',auth,companyRouter)
app.use('/api/v1/invitations',auth,inviteRouter)

// createRole()

const db = "mongodb://localhost:27017/teamcrm"

dotenv.config()

app.post('/refresh', (req, res) => {
  const refreshToken = req.headers?.jwt

  if (refreshToken && typeof refreshToken === 'string') {
      
      jwt.verify(refreshToken, endpoint.REFRESH_TOKEN_SECRET, 
      (err:any, decoded:any) => {
          if (err) {

              return res.status(406).json({ message: 'Unauthorized' })
          }
          else {
              // Correct token we send a new access token
              const accessToken = generateAccessToken({ user_id: decoded.user_id })
              return res.json({ accessToken })
          }
      })
  } else {
      return res.status(406).json({ message: 'Unauthorized' });
  }
})

app.listen(endpoint.PORT, () => {console.log(`Application started on port ${3004}`)})
mongoose.connect(db).then(() => console.log('connected to db..')).catch((err:any)=>{
  console.log(err + 'error')
})