import mongoose, { Schema } from 'mongoose'

const UserSchema = new mongoose.Schema({
  company: { type: Schema.Types.ObjectId, required: false, ref:'Company' },
  projects: { type: Schema.Types.ObjectId, required: false, ref:'Project' },
  firstname: { type: String, required: true, },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  photo:  { type: String, required: false },
  role: { type: Schema.Types.ObjectId, required:false, ref:'Role' }
})
  
  const User = mongoose.model('User',UserSchema)

  export { User }
  
 