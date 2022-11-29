import mongoose from 'mongoose'
import express from 'express'
import { json } from "body-parser"
import { AuthRouter } from "./routes/auth"
import  session  from 'express-session'
import cors from 'cors'
import * as dotenv from 'dotenv'
import endpoint from '../endpoints.config'
import { auth } from "./util"
import { userRouter } from "./routes/user" 
import { companyRouter } from "./routes/company"
import { createRole } from './util'
import { inviteRouter } from './routes/invite'
import { projectRouter } from './routes/project' 

const app  = express()

app.use(cors())
app.use(session({
  secret: endpoint.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(json())
app.use(AuthRouter)
app.use("/api/v1/auth", AuthRouter)
app.use("/api/v1/user",auth,userRouter)
app.use('/api/v1/companies',auth,companyRouter)
app.use('/api/v1/invitations',inviteRouter)

// createRole()

const db = "mongodb://localhost:27017/teamcrm"

dotenv.config()

app.listen(endpoint.PORT, () => {console.log(`Application started on port ${3004}`)})
mongoose.connect(db).then(() => console.log('connected to db..')).catch((err:any)=>{
  console.log(err + 'error')
})