import { Schema, model } from 'mongoose' 

const notifSchema = new Schema({
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


const Notif = model('Notif', notifSchema);
export  { Notif }