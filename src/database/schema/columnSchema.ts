import { Schema,model } from 'mongoose'

const ColumnSchema = new Schema({
    title: { type: String, required: true },
    tasks: [ { type: Schema.Types.ObjectId, ref:'Task' } ]
})

const Column = model('Column', ColumnSchema)

export { Column, ColumnSchema }