import mongoose, { model, Schema, Model, Document } from 'mongoose'

const CompanySchema = new mongoose.Schema({
    name:Schema.Types.String,
    owner_id:Schema.Types.String,
    logo:Schema.Types.Buffer,
    description:Schema.Types.String,
    address:Schema.Types.String,
    webpage:Schema.Types.String,
    phonenumber:Schema.Types.Number,
})


const Company = mongoose.model("Company",CompanySchema)

export { Company }
