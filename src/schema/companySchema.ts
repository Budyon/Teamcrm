import mongoose, { Schema } from 'mongoose'

// const projectCompany = new mongoose.Schema({
// })

// const userCompany = new mongoose.Schema({
//     user: { type: Schema.Types.ObjectId, ref:'User'},
//     role: { type: Schema.Types.ObjectId, ref:'Role'},
// },{ _id: false })

const CompanySchema = new mongoose.Schema({
    name:Schema.Types.String,
    owner_id:Schema.Types.String,
    logo:Schema.Types.String,
    description:Schema.Types.String,
    address:Schema.Types.String,
    webpage:Schema.Types.String,
    phonenumber:Schema.Types.Number,
    users: [{ 
        user: { type: Schema.Types.ObjectId, ref:'User'},
        role: { type: Schema.Types.ObjectId, ref:'Role'}
     }],
    projects:[{
        user_owner: { type: Schema.Types.ObjectId, ref:'User'} } ],
        project: { type: Schema.Types.ObjectId, ref:'Project' }
})

const Company = mongoose.model("Company",CompanySchema)

export { Company }
