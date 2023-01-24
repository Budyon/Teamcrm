import express from 'express'
import  { Chat }  from '../schema/chatSchema'

const router = express.Router()

router.get('/',(req,res)=>{
    res.json({
        message:'Chat router worked'
    })
})

export { router as chatRouter }