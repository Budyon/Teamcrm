import express from 'express'
import  { Message }  from '../schema/messageSchema'
import http from 'http'
import socketio from 'socket.io'
import { Notif } from '../schema/notifSchema'

const router = express.Router()

router.post('/sendnotif',async (req, res) => {
    const { sender, reciver, content, chatID } = req.body;
    const newNotif = {
        sender: sender,
        reciver: reciver,
        content: content,
        chat: chatID,
    };

    try {
        const notif = await Notif.findOneAndUpdate({ chat: chatID }, {
            content: content
        })
        if (notif) res.send(notif)
        else await Notif.create(newNotif);
        res.send(newNotif);
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.post('/setreadnotif', async (req, res) => {
    const  notifId  = req.params
    try {
        const readNotif = await Notif.deleteOne({ _id: notifId })
        return res.send(readNotif)
    } catch (error) {
        console.log(error);
        res.status(400).send(error)
    }

})
 router.post('AllNotifs', async (req, res) => {
    try {
        const currentUserId  = req.params
        const notifs = await Notif.find({
            reciver: currentUserId
        })
            .populate('sender', 'name surname avatar email')

        res.json(notifs)
    } catch (error) {
        res.json(error)
    }

})