const mongoose = require('mongoose')

const notifScema = mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    reciver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    content: {
        type: String,
        trim: true,
    },
    chat: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat"
    },
   
}, { timestamps: true })


const Notif = mongoose.model("Notif", notifScema);
export  { Notif }