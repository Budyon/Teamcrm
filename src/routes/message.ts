import express from 'express'
import  { Message }  from '../schema/messageSchema'
import http from 'http'
import socketio from 'socket.io'

const router = express.Router()

router.get('/',( req,res ) => {
    res.json({
        message:'Message router worked'
    })
})

export { router as messageRouter }