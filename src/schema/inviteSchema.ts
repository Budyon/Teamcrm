import mongoose, { Schema } from 'mongoose'

const InviteSchemaCompany = new mongoose.Schema({
    companyId:Schema.Types.ObjectId,
    userId:Schema.Types.ObjectId,
    roleId:Schema.Types.ObjectId,
    active:Schema.Types.Boolean
})

const InviteSchemaProject = new mongoose.Schema({
    projectId:Schema.Types.ObjectId,
    userId:Schema.Types.ObjectId,
    contractDate:Schema.Types.Date,
    roleId:Schema.Types.ObjectId,
    active:Schema.Types.Boolean
})

const inviteCompany = mongoose.model("InviteCompany",InviteSchemaCompany)
const inviteProject = mongoose.model("InviteProject",InviteSchemaProject)

export { inviteCompany,inviteProject }