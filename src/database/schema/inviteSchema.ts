import { Schema, model } from 'mongoose'

const InviteSchemaCompany = new Schema({
    companyId:Schema.Types.ObjectId,
    userId:Schema.Types.ObjectId,
    roleId:Schema.Types.ObjectId,
    active:Schema.Types.Boolean
})

const InviteSchemaProject = new Schema({
    projectId:Schema.Types.ObjectId,
    userId:Schema.Types.ObjectId,
    contractDate:Schema.Types.Date,
    roleId:Schema.Types.ObjectId,
    active:Schema.Types.Boolean
})

const inviteCompany = model('InviteCompany',InviteSchemaCompany)
const inviteProject = model('InviteProject',InviteSchemaProject)

export { inviteCompany,inviteProject }