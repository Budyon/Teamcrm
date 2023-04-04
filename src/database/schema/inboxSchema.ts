import { Schema,model } from 'mongoose'

const inboxSchema = new Schema({
    title: { type: String, required: true },
    tasks: [ { type: Schema.Types.ObjectId, ref:'Task' } ]
})

const Inbox = model('Column', inboxSchema)

const project = {
inboxes: [
    {
    title : '',
    tasks: [
        'taskID', 'taskID'
    ]
},
{
    title : '',
    tasks: [
        'taskID', 'taskID'
    ]
}
]

}

export { Inbox, inboxSchema }