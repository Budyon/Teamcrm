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
import multer from 'multer'
import { messageRouter } from './routes/message'
import { chatRouter } from './routes/chat'
import http from 'http'
import { Server } from "socket.io"
import path from 'path'
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from 'index'

const app  = express()
const server = http.createServer(app)
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  transports: ['polling']
})

io.on('connection', (socket:any) => {
  console.log(socket.id)
  
  socket.on('message', (message: string) => {
    console.log('From Front', message);
    
    socket.emit('message', { message: 'a new client connected barev' })
  })

})

app.use(express.static(__dirname + '/public'))

const upload = multer({ dest: 'uploads/' })


app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
app.use(session({
  secret: endpoint.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
// app.use(json())
// app.use(urlencoded({ extended: true }))
app.use(cookieParser())
// app.use(upload.any()) 

app.use(AuthRouter)
app.use("/api/v1/auth", AuthRouter)
app.use("/api/v1/user", auth, userRouter)
app.use('/api/v1/companies', auth, companyRouter)
app.use('/api/v1/invitations', auth, inviteRouter)
app.use('/api/v1/messages',auth,messageRouter)
app.use('/api/v1/chats',auth,chatRouter)

app.get('/',(req,res)=>{
res.sendFile(path.join(__dirname,'./public/index.html'))
})

// createRole()

dotenv.config()

server.listen(endpoint.PORT, () => {console.log(`Application started on port ${endpoint.PORT}`)})

mongoose.connect(endpoint.MONGO_URL).then(() => console.log('connected to db..')).catch((err:any)=>{
  console.log(err + 'error')
})