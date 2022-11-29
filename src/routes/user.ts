import express from 'express'
import { json } from 'body-parser'
import  jwt  from 'jsonwebtoken'
import  {User}  from '../schema/userSchema'
import bcrypt from 'bcrypt'
import { Request, Response } from 'express'
import endpoint from '../../endpoints.config'
import { body,validationResult } from 'express-validator'
import bodyParser from 'body-parser'


const router  = express.Router()
router.use(json())
router.use(bodyParser.urlencoded({ extended: true }))

router.put("/",
    body('firstName').isString(),
    body('lastName').isString(),
    body('photo').isString(),
    body('email').isEmail(),
    body('password').isString(),
     async (req, res) => {
         
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.json(errors)
        }
        const { firstName, lastName, photo, email, password } = req.body
        const user = await User.findByIdAndUpdate(req.token.user_id, {
            firstName,
            lastName,
            email,
            password,
            photo
        })
        if (user === undefined) {
            res.status(201).json({
                error: "Error"
            })
        } else {
            res.json({
                success: "User Successfully updated"
            })
        }
    })


export { router as userRouter}