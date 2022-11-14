import mongoose, { model, Schema, Model, Document, mongo } from 'mongoose'
import { User } from './userSchema'


const userCompany = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref:'User'},
    role: { type: Schema.Types.ObjectId, ref:'Role'},
})

const CompanySchema = new mongoose.Schema({
    name:Schema.Types.String,
    owner_id:Schema.Types.String,
    logo:Schema.Types.String,
    description:Schema.Types.String,
    address:Schema.Types.String,
    webpage:Schema.Types.String,
    phonenumber:Schema.Types.Number,
    users: [ { type:userCompany } ],
})

const Company = mongoose.model("Company",CompanySchema)

export { Company }


// [
//     {
//         user: User,
//         role: 'owner'
//     }
// ]