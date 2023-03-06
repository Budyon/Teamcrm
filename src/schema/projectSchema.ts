import mongoose, { model, Schema, Model, Document, mongo } from 'mongoose'

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true  },
    owner_id: { type: String, },
    companyId: { type:Schema.Types.ObjectId, },
    logo: { type: String },
    description: { type: String },
    address: { type: String },
    webpage: { type: String },
    phonenumber: { type: Number },
    users: [ { type: Schema.Types.ObjectId, ref:'User' } ],
    columns: [ {type: Schema.Types.ObjectId, ref:'Column'} ],
})

const Project = mongoose.model("Project",ProjectSchema)

export { Project }


