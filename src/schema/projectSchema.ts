import mongoose, { model, Schema, Model, Document, mongo } from 'mongoose'
import { assign } from 'nodemailer/lib/shared'

const userProject = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref:'User'},
    role: { type: Schema.Types.ObjectId, ref:'Role'},
    contractDate:Schema.Types.Date
})

const taskProject = new mongoose.Schema({
    type: Schema.Types.String,
    task: Schema.Types.String,
    taskName: Schema.Types.String,
    description: Schema.Types.String,
    photo: Schema.Types.String,
    setPriority: Schema.Types.String,
    dueData: Schema.Types.Date,
    assignMember: Schema.Types.ObjectId,
    creator: Schema.Types.ObjectId
})

const ProjectSchema = new mongoose.Schema({
    name:Schema.Types.String,
    owner_id:Schema.Types.String,
    logo:Schema.Types.String,
    description:Schema.Types.String,
    address:Schema.Types.String,
    webpage:Schema.Types.String,
    phonenumber:Schema.Types.Number,
    users: [ { type:userProject } ],
    tasks: [ { type:taskProject } ],
    companyId:Schema.Types.ObjectId
})

const Project = mongoose.model("Project",ProjectSchema)

export { Project }


