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
    name:{ type: String, required: true  },
    owner_id:{ type: String, required: true },
    logo:{ type: String, required: true  },
    description:{ type: String, required: true, },
    address:{ type: String, required: true  },
    webpage:{ type: String, required: true  },
    phonenumber:{ type: Number, required: true  },
    users: [ { type:userProject } ],
    tasks: [ { type:taskProject } ],
    subtask: [ { type:taskProject } ],
    companyId:Schema.Types.ObjectId
})

const Project = mongoose.model("Project",ProjectSchema)

export { Project }


