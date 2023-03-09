import mongoose  from 'mongoose'
import  { User }  from './userSchema'

const chatSchema = new mongoose.Schema({

    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    }],

    messages: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
    }],

}, { timestamps: true })

const Chat = mongoose.model("Chat", chatSchema)

export { Chat } 