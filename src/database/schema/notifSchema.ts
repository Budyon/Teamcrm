import { Schema, model } from 'mongoose' 

const notifScema = new Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    reciver: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    content: {
        type: String,
        trim: true,
    },
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat'
    },
   
}, { timestamps: true })


const Notif = model('Notif', notifScema);
export  { Notif }