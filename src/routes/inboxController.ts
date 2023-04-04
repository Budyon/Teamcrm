import express from 'express'
import { Project } from '../database/schema/projectSchema'
import { Inbox } from '../database/schema/inboxSchema'
import { Request, Response } from 'express'

const router = express()

// router.post('/tasks:/inbox', async (req:Request,res:Response) => {
//     try {
//         console.log(req)
//         const project = await Project.findById(req.params.id)

//         const inbox = await Inbox.create(req.body)
        
//         await project?.save()

//         return res.status(200).json({ message: 'Inbox successfully created' })
//     }
//     catch (error) {
//         res.status(404).json({ error:error })
//     }
// })

export { router as inboxRouter }