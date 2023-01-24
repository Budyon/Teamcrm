import mongoose, { Schema } from 'mongoose'

const messageSchema = new mongoose.Schema({
    sender: { type: Schema.Types.ObjectId, required:true, ref:'User'},
    chat: { type: Schema.Types.ObjectId,required:true, ref:'Chat'},
    message:{ type:Schema.Types.String,required:true},
}, { timestamps:true } )

const Message = mongoose.model("Message",messageSchema)

export { Message }