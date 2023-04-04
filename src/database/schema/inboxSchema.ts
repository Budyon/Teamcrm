import { Schema,model } from 'mongoose'

const inboxSchema = new Schema({
    title: { type: String, required: true },
    tasks: [ { type: Schema.Types.ObjectId, ref:'Task' } ]
})

const Inbox = model('Inbox', inboxSchema)

export { Inbox, inboxSchema }