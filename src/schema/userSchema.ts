import mongoose, { model, Schema, Model, Document,ObjectId, SchemaTypes } from 'mongoose'

const UserSchema = new mongoose.Schema({
    firstName:Schema.Types.String,
    lastName: Schema.Types.String,
    email: Schema.Types.String,
    password: Schema.Types.String,
  })

  const User = mongoose.model("User",UserSchema)

  export { User }
  
 