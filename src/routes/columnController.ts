import express from 'express'
import { Project } from '../database/schema/projectSchema'
import { Column } from '../database/schema/columnSchema'

const router = express()

router.post('/:id',async (req,res) => {
    try {
        const project = await Project.findById(req.params.id)
        const { title } = req.body
        const column = await Column.create({title,tasks:[]})
        
        project?.columns.push(column)
        await project?.save()
        res.status(200).json(column)
    } catch (error) {
        res.status(404).json({
            message:error
        })   
    }

})

export { router as columnRouter }