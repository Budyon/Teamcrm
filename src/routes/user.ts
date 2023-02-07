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
    async (req: Request<{}, {}>, res: Response) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            const updated = req.body
            
            if (req.file && req.file.path) {
                updated.photo = 'http://localhost:3004/uploads/' + req.file?.filename
            }

             const user = await User.findByIdAndUpdate(req.user?._id, updated, {new: true})
            
            return res.json({
                success: "User Successfully updated",
                data: new UserDto(user),
            })
        } catch (error) {
            res.status(404).json(error)
        }
    })

router.get("/", async (req, res) => {
    res.json({
        data: new UserDto(req.user)
    })
})

router.get("/:id", async (req, res) => {
    const user = await User.findById(req.params.id) 
    res.json({
        data: new UserDto(user)
    })
})

export { router as userRouter }