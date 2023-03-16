import express from 'express'
import { Column } from '../database/schema/columnSchema'

const router = express()

router.post('/',async (req,res) => {
    try {
        const { title } = req.body
        const column = await Column.create(title)

        res.status(200).json(column)
    } catch (error) {
        res.status(404).json({
            message:error
        })   
    }

})

export { router as columnRouter }