import express from 'express'
import { Chat }  from '../schema/chatSchema'

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
            .populate('users', 'name surname avatar email')
            .populate('messages', 'content sender')
            .populate('notifs', 'content sender')
        if (chat) {
            res.send(chat);
        } else {
            let chatData = {
                chatName: [currentUserId, secondUserId],
                isGroupChat: false,
                users: [currentUserId, secondUserId],
            };
            try {
                const createdChat = await Chat.create(chatData);
                const fullChat = await Chat.findOne({ _id: createdChat._id }).populate("users", "name surname avatar email");
                res.send(fullChat)
            } catch (error) {
                res.status(500).json(error)
            }
        }
    } catch (error) {
        console.log(error);
    }
})

export { router as chatRouter }