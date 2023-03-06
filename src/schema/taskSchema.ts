import  mongoose, { Schema } from 'mongoose'

const taskProject = new mongoose.Schema({
    taskName: { type: String, required: true },
    description: { type: String, required: true },
    photo: { type: String, required: false },
    setPriority: { type: String, required: true },
    dueData: { type: Schema.Types.Date, required: true },
    assignMember: { type:Schema.Types.ObjectId, required:false },
    creator: { type:Schema.Types.ObjectId, required:false }
})

const TaskProject = mongoose.model("Task",taskProject)

export { TaskProject }

