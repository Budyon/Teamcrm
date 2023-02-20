import mongoose, { model, Schema, Model, Document, mongo } from 'mongoose'

// const userProject = new mongoose.Schema({
//     user: { type: Schema.Types.ObjectId, ref:'User'},
//     role: { type: Schema.Types.ObjectId, ref:'Role'},
//     contractDate:{ type:Schema.Types.Date }
// })

const ProjectSchema = new mongoose.Schema({
    name: { type: String, required: true  },
    owner_id: { type: String, required: true },
    companyId: { type:Schema.Types.ObjectId,required:true },
    
    logo: { type: String },
    description: { type: String },
    address: { type: String },
    webpage: { type: String },
    phonenumber: { type: Number },
    users: [
        { type: Schema.Types.ObjectId, ref:'User' }
    ],
    tasks: [ { type: Schema.Types.ObjectId, ref:'Task'} ]
})

const Project = mongoose.model("Project",ProjectSchema)

export { Project }


