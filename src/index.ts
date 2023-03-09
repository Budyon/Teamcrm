import mongoose from 'mongoose'
import express from 'express'
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
import { messageRouter } from './routes/message'
import { chatRouter } from './routes/chat'
import http from 'http'
import { Server } from "socket.io"
import path from 'path'
// import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from 'index'
import { Chat } from './schema/chatSchema'

const app  = express()

const server = http.createServer(app)

const io = new Server
  // ClientToServerEvents,
  // ServerToClientEvents,
  // InterServerEvents,
  // SocketData
(server, {
  transports: ['polling']
})

io.on("connection", async (socket:any) => {
  
  const { userId } = socket.handshake.query
  const chatIds = await Chat.find({ users: { $elemMatch: { $eq: userId } } }, '_id')
  
  chatIds.forEach((chatId:any) => {
    socket.join(chatId._id.toString())
  })
  socket.on("sendMessage", (props:any) => {
    console.log(props)
    io
      .to(props.chatID.toString())
      .emit("getMessage", {
        content: props.content,
        sender: props.sender,
        chat: props.chatID,
      })
  })
})

app.use('/uploads', express.static(path.join(__dirname,'uploads')))

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(cors())
app.use(session({
  secret: endpoint.SESSION_SECRET,
  resave: false,
  saveUninitialized: false
}))
app.use(cookieParser())

app.use(AuthRouter)
app.use("/api/v1/auth", AuthRouter)
app.use("/api/v1/user", auth, userRouter)
app.use('/api/v1/companies', auth, companyRouter)
app.use('/api/v1/invitations', inviteRouter)
app.use('/api/v1/messages',auth,messageRouter)
app.use('/api/v1/chats',auth,chatRouter)

app.get('/',(req,res)=> {
  res.sendFile(path.join(__dirname,'./public/index.html'))
})

// createRole()

dotenv.config()

server.listen(endpoint.PORT, () => {console.log(`Application started on port ${ endpoint.PORT }`)})

mongoose.connect(endpoint.MONGO_URL).then(() => console.log('connected to db..')).catch((err:any)=>{
  console.log(err + 'error')
})