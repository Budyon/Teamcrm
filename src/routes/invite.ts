import express from 'express'
import { json } from 'body-parser'
import { Request, Response } from 'express'
import { main } from '../../util'

const router  = express.Router()
router.use(json())

router.get('/',(req:Request,res:Response) => {
    res.json({
        aaa:"asa"
    })
})

router.post('/',(req:Request,res:Response) => {
console.log(req.body)
      main().catch(console.error)
    res.json({
        aaa:"asa"
    })
})

export { router as inviteRouter }