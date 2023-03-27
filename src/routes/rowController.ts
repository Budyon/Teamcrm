import  express  from 'express'
import { Row } from '../database/schema/rowSchema'

const router = express()

router.post('/',async (req,res) => {
    try {
        const { title,task } = req.body
        console.log(title)
        
        const row = await Row.create({
             title:title
        })

            row.tasks.push(task)
            row.save()

        res.status(200).json(row)
    } catch (error) {
        res.status(404).json({
            message:'asdsad'
        })   
    }
})

export { router as rowRouter }
