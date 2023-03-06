import mongoose, { model, Schema } from 'mongoose'
import { taskProject } from './taskSchema'

const ColumnSchema = new mongoose.Schema({
    title: { type: String, required: true  },
    tasks: [ taskProject ]
})

const Column = mongoose.model('Column', ColumnSchema)

export { Column, ColumnSchema }
