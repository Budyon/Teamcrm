import express from 'express'
import { Notif } from '../database/schema/notifSchema'
import { notifDto } from '../dto/notif/notifDto'

const router = express.Router()

router.post('/sendnotif',async (req, res) => {
    const { sender, reciver, content, chatID } = req.body
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
        if (notif){
         res.status(200).json(new notifDto(notif))
        }else {
            await Notif.create(newNotif)
        }    
        res.status(200).json(new notifDto(newNotif))
    } catch (error) {
        console.log(error)
        res.status(400).send(error)
    }
})

router.post('/setreadnotif', async (req, res) => {
    const  notifId  = req.params
    try {
        const readNotif = await Notif.deleteOne({ _id: notifId })
        return res.status(200).json(readNotif)
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
            .populate('sender', 'firstname lastname photo email')

        res.json(notifs)
    } catch (error) {
        res.json(error)
    }

})

export { router as notifRouter }