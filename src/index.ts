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
import { inviteRouter } from './routes/invite'
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser'
import multer from 'multer'

const app  = express()
multer({ dest: 'uploads/' })

app.use(bodyParser.json())
app.use(cors())
app.use(session({
  secret: endpoint.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(cookieParser())

app.use(AuthRouter)
app.use("/api/v1/auth", AuthRouter)
app.use("/api/v1/user", auth, userRouter)
app.use('/api/v1/companies', auth, companyRouter)
app.use('/api/v1/invitations', auth, inviteRouter)

// createRole()

const db = "mongodb://localhost:27017/teamcrm"

dotenv.config()

app.listen(endpoint.PORT, () => {console.log(`Application started on port ${3004}`)})

mongoose.connect(db).then(() => console.log('connected to db..')).catch((err:any)=>{
  console.log(err + 'error')
})