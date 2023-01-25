import mongoose from 'mongoose'

const UserSchema = new mongoose.Schema({
  companyId: {type: Object, required: false },
  firstname: { type: String, required: true, },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  photo:  { type: String, required: false },
  role: { type: String }
})
  
  const User = mongoose.model("User",UserSchema)

  export { User }
  
 