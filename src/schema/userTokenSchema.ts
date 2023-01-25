import mongoose, { Schema } from 'mongoose'

const Token = new mongoose.Schema({
    userId:({ type:Schema.Types.ObjectId, ref:'User' }),
    token:({ type: Schema.Types.String })
})

const UserToken = mongoose.model("Token",Token)

export { UserToken }