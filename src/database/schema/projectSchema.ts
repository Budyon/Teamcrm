import { Schema, model } from 'mongoose'

const ProjectSchema = new Schema({
    projectName: { type: String, required: true },
    managerId: {type: String, required: false},
    owner_id: { type: Schema.Types.ObjectId, ref:'User' },
    companyId: { type:Schema.Types.ObjectId, },
    projectLogo: { type: Schema.Types.String },
    description: { type: Schema.Types.String },
    projectAddress: { type: Schema.Types.String },
    projectWebpage: { type: Schema.Types.String },
    projectPhone: { type: Schema.Types.Number },
    projectUsers: [{ type: Schema.Types.ObjectId, ref:'User' }],
    inboxes: [ { type:Schema.Types.ObjectId, ref:'Inbox' } ],
    tasks:[{ type:Schema.Types.ObjectId, ref:'User'}]
})

const Project = model('Project',ProjectSchema)

export { Project }


