import { Schema, model } from 'mongoose'
import { ColumnSchema } from './columnSchema'

const ProjectSchema = new Schema({
    projectName: { type: String, required: true  },
    managerId: {type: String, required: false},
    owner_id: { type: String, },
    companyId: { type:Schema.Types.ObjectId, },
    projectLogo: { type: String },
    description: { type: String },
    projectAddress: { type: String },
    projectWebpage: { type: String },
    projectPhone: { type: Number },
    projectUsers: [{ type: Schema.Types.ObjectId, ref:'User' }],
    columns: [ ColumnSchema ],
})

const Project = model('Project',ProjectSchema)

export { Project }


