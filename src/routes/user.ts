import express from 'express'
import { User } from '../schema/userSchema'
import { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { upload } from '../util'
import { UserDto } from '../dto/user/UserDto'

const router = express.Router()

router.put("/", upload.single('photo'),
    body('firstname').isString().optional(),
    body('lastname').isString().optional(),
    body('email').isEmail().optional(),
    body('password').isString().optional(),
    async (req: Request<{}, {}>, res: Response) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            const updated = req.body

            if (req.file && req.file.path) {
                updated.photo = req.file.path
            }

            const user = await User.findByIdAndUpdate(req.token.user_id, updated)

            user?.save()

            return res.json({
                success: "User Successfully updated",
                data: new UserDto(user),
            })
        } catch (error) {
            res.json(error)
        }
    })

router.get("/", async (req, res) => {
    const user = await User.findById(req.token.user_id)
    res.json(user)
})

export { router as userRouter }