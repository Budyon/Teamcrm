import express from 'express'
import  { User }  from '../schema/userSchema'
import { Request, Response } from 'express'
import { body,validationResult } from 'express-validator'

const router  = express.Router()

router.put("/",
body('firstname').isString(),
body('lastname').isString(),
body('email').isEmail(),
body('password').isString(),
async (req:Request, res:Response) => {
    try {
        const { firstName, lastName, photo, email, password } = req.body
        const errors = validationResult(req)
        
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const user = await User.findByIdAndUpdate(req.token.user_id, {
            firstName,
            lastName,
            email,
            password,
            photo
        })
        if (user === undefined) {
            res.status(404).json({
                message: "User not defined"
            })
        } else {
            res.json({
                success: "User Successfully updated"
            })
        }
    } catch (error) {
        res.json(error)
        }
    })

    router.get("/", async(req,res) => {
        const user = await User.findById(req.token.user_id)
        res.json(user)
    })

export { router as userRouter}