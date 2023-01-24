import mongoose, { Schema } from 'mongoose'

const projectCompany = new mongoose.Schema({
    user_owner: { type: Schema.Types.ObjectId, ref:'User'},
    project: { type: Schema.Types.ObjectId, ref:'Project'},
})

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
    projects:[ { type:projectCompany } ]
})

const Company = mongoose.model("Company",CompanySchema)

export { Company }
