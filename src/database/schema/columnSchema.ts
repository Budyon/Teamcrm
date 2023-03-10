import mongoose, { model, Schema } from 'mongoose'

const ColumnSchema = new mongoose.Schema({
    title: { type: String, required: true  },
    tasks: [ { type: Schema.Types.ObjectId, ref:'Task' } ]
})

const Column = mongoose.model('Column', ColumnSchema)

export { Column, ColumnSchema }