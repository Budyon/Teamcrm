import express from 'express'
import  { Message }  from '../schema/messageSchema'
import http from 'http'
import socketio from 'socket.io'
import { Chat } from '../schema/chatSchema'

const router = express.Router()

router.post('/', async ( req,res ) => {
    
        const { reciver, content, chatID } = req.body
        const newMessage = {
            sender: req.user?._id,
            reciver: reciver,
            content: content,
            chat: chatID
        }
        try {
            const message = await Message.create(newMessage)
            const chat = await Chat.findById(req.body.chatID)

            if(chat){
                chat.messages = [...chat.messages, message._id]
                await chat.save()
            }
            return res.send(newMessage)
        } catch (error) {
            console.log(error)
            res.status(400).send(error)
        }
    })
    

export { router as messageRouter }

router.post('/allMasseges',async (req, res) => {
    try {
        const  chatId  = req.params
        const messages = await Message.find({ chat: chatId })
        res.json(messages)
    } catch (error) {
        res.json(error)
    }
})


