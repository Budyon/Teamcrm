import { Schema, model }  from 'mongoose'

const chatSchema = new Schema({

    users: [ { type: Schema.Types.ObjectId,ref: 'User' } ],
    messages: [ { type: Schema.Types.ObjectId,ref: 'Message' } ],
    notifs: [ { type: Schema.Types.ObjectId,ref: 'Notif' } ]

}, { timestamps: true })

const Chat = model('Chat', chatSchema)

export { Chat } 