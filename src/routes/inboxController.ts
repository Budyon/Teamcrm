import express from 'express'
import { Project } from '../database/schema/projectSchema'
import { Inbox } from '../database/schema/inboxSchema'
import { Request, Response } from 'express'
import { TaskProject } from '../database/schema/taskSchema'

const router = express()

router.post('/:projectId/inbox', async (req:Request,res:Response) => {
    try {
        console.log(req.params)
        // const project = await Project.findById(req.params.id)
        await Inbox.create(req.body)
        // project?.tasks.push(task._id)
        // project?.inboxes.push(task._id)

        // await project?.save()
        res.status(200).json({message:'Inbox Successfully created'})
    }
    catch (error) {
        console.log(error)
    }
})

router.delete('/:projectId/inbox/:inboxId', async (req:Request,res:Response) => {
    try {
        await Inbox.findByIdAndDelete(req.params.inboxId)
        res.status(200).json({message:'Inbox Successfully deleted'})
    }
    catch (error) {
        res.status(403).json({error})
    }
})

router.post('/:projectId/task', async (req:Request,res:Response) => {
    try {
        const task = await TaskProject.create(req.body)
        const project = await Project.findById(req.params.projectId)
        project?.tasks.push(task._id)
        project?.inboxes.push(task._id)

        await project?.save()
        res.status(200).json({message:'Task Successfully created'})
    }
    catch (error) {
        console.log(error)
    }
})

export { router as inboxRouter }