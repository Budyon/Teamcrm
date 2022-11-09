import mongoose, { model, Schema, Model, Document } from 'mongoose'

const InviteSchema = new mongoose.Schema({
    companyId:Schema.Types.Number,
    userId:Schema.Types.Number,
    active:Schema.Types.Boolean,
})


const Invite = mongoose.model("Invite",InviteSchema)

export { Invite }