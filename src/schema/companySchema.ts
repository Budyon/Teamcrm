import mongoose, { Schema } from 'mongoose'
// import { User } from './userSchema'

// const userCompany = new mongoose.Schema({
//     user: { type: Schema.Types.ObjectId, ref:'User'},
//     role: { type: Schema.Types.ObjectId, ref:'Role'},
// },{ _id: false })

const CompanySchema = new mongoose.Schema({
    name:{type: Schema.Types.String, required:true },
    owner_id: { type: Schema.Types.ObjectId,ref:'User' },
    logo: { type: Schema.Types.String },
    description: { type: Schema.Types.String },
    address: { type: Schema.Types.String },
    webpage: { type: Schema.Types.String },
    phonenumber: { type: Schema.Types.String },
    users: [
        { type: Schema.Types.ObjectId, ref:'User' }
    ],
    projects:[{
        user_owner: { type: Schema.Types.ObjectId, ref:'User'},
        project: { type: Schema.Types.ObjectId, ref:'Project' }
    }]
})

const Company = mongoose.model("Company",CompanySchema)

export { Company }
