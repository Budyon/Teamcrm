import mongoose, { model, Schema, Model, Document,ObjectId, SchemaTypes } from 'mongoose'

const UserSchema = new mongoose.Schema({
    firstName: { type: String, required: true,  },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    photo:  { type: String, required: true },
    role: { type: String }
  })

  const User = mongoose.model("User",UserSchema)

  export { User }
  
 