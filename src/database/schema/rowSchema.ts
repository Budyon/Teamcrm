import { Schema,model } from 'mongoose'

const RowSchema = new Schema({
    title: { type: Schema.Types.String, required: true },
    tasks: [ { type: Schema.Types.ObjectId, ref:'Task' } ]
})

const Row = model('Row', RowSchema)

export { Row }