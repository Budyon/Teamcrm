import mongoose, { model, Schema } from 'mongoose'
import { TaskProject } from './taskSchema'


const ColumnSchema = new mongoose.Schema({
    title: { type: String, required: true  },
    tasks: [ { type: Schema.Types.ObjectId, ref:'Task' } ]
})

const Column = mongoose.model('Column', ColumnSchema)

export { Column, ColumnSchema }