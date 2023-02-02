import mongoose, { model, Schema, Model, Document, mongo } from 'mongoose'
import { assign } from 'nodemailer/lib/shared'

const userProject = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref:'User'},
    role: { type: Schema.Types.ObjectId, ref:'Role'},
    contractDate:{ type:Schema.Types.Date }
})

const taskProject = new mongoose.Schema({
    taskName: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String, required: false },
    setPriority: { type: String, required: true },
    dueData: { type: Schema.Types.Date, required: true },
    assignMember: { type:Schema.Types.ObjectId, required:false },
    creator: { type:Schema.Types.ObjectId, required:false }
})

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true  },
    owner_id: { type: String, required: true },
    companyId: { type:Schema.Types.ObjectId,required:true },

    logo: { type: String },
    description: { type: String },
    address: { type: String },
    webpage: { type: String },
    phonenumber: { type: Number },
    users: [ { type:userProject } ],
    tasks: [ { type:taskProject } ],
    subtask: [ { type:taskProject } ]
})

const Project = mongoose.model("Project",ProjectSchema)

export { Project }


