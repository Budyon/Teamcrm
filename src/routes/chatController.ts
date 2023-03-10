import express from 'express'
import { chatDto } from '../dto/chat/ChatDto'
import { Chat }  from '../database/schema/chatSchema'

const router = express.Router()

 router.post('/',async (req, res) => {
    try {
        const { currentUserId, secondUserId } = req.body
        const chat = await Chat.findOne({
            isGroup: false,
            $and: [
                { users: { $elemMatch: { $eq: currentUserId } } },
                { users: { $elemMatch: { $eq: secondUserId } } }
            ]
        })
            .populate('users', 'firstname lastname photo email')
            .populate('messages', 'content sender')
            .populate('notif', 'content sender')
        if (chat) {
            res.status(200).json(new chatDto(chat))
        } else {
            let chatData = {
                chatName: [currentUserId, secondUserId],
                isGroupChat: false,
                users: [currentUserId, secondUserId],
            };
            try {
                const createdChat = await Chat.create(chatData);
                const fullChat = await Chat.findOne({ _id: createdChat._id }).populate('users', 'firstname lastname photo email')
                res.status(200).json(new chatDto(fullChat))
            } catch (error) {
                res.status(500).json(error)
            }
        }
    } catch (error) {
        console.log(error);
    }
})

export { router as chatRouter }