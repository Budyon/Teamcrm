import mongoose, { Schema } from 'mongoose'

const UserSchema = new mongoose.Schema({
  companyId: {type: Object, required: false },
  companyName: { type: String, required: false },
  firstname: { type: String, required: true, },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  photo:  { type: String, required: false },
  role: { type: Schema.Types.ObjectId, required:false }
})
  
  const User = mongoose.model("User",UserSchema)

  export { User }
  
 