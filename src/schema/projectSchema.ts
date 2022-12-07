import mongoose, { model, Schema, Model, Document, mongo } from 'mongoose'
import { assign } from 'nodemailer/lib/shared'

const userProject = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref:'User'},
    role: { type: Schema.Types.ObjectId, ref:'Role'},
    contractDate:{ type:Schema.Types.Date }
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


