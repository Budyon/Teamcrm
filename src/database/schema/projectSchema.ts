import { Schema, model } from 'mongoose'
import { ColumnSchema } from './columnSchema'

const ProjectSchema = new Schema({
    name: { type: String, required: true  },
    owner_id: { type: String, },
    companyId: { type:Schema.Types.ObjectId, },
    logo: { type: String },
    description: { type: String },
    address: { type: String },
    webpage: { type: String },
    phonenumber: { type: Number },
    users: [{ type: Schema.Types.ObjectId, ref:'User' }],
    columns: [ ColumnSchema ],
})

const Project = model('Project',ProjectSchema)

export { Project }


