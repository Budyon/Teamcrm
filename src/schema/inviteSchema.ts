import mongoose, { model, Schema, Model, Document } from 'mongoose'

const InviteSchema = new mongoose.Schema({
    companyId:Schema.Types.ObjectId,
    userId:Schema.Types.ObjectId,
    roleId:Schema.Types.ObjectId,
    active:Schema.Types.Boolean
})


const Invite = mongoose.model("Invite",InviteSchema)

export { Invite }