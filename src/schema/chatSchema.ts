import mongoose, { Schema } from 'mongoose'

const chatSchema = new mongoose.Schema ({
    users:{type:Schema.Types.Array, ref:'User'}
})

const Chat = mongoose.model("Chat",chatSchema)

export { Chat }