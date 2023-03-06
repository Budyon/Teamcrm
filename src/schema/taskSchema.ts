import  mongoose, { Schema } from 'mongoose'

const taskProject = new mongoose.Schema({
    taskName: { type: String, required: true },
    status:{type: String, required: true},
    description: { type: String, required: false },
    photo: { type: String, required: false },
    setPriority: { type: String, required: false },
    dueData: { type: Schema.Types.Date, required: false },
    assignMember: { type:Schema.Types.ObjectId, required:false },
    creator: { type:Schema.Types.ObjectId, required:false }
})

const TaskProject = mongoose.model("Task",taskProject)

export { Task, taskProject }

