import express from 'express'
import { json } from 'body-parser'
import { Request, Response } from 'express'
import nodemailer from 'nodemailer'
import { Invite } from '../schema/inviteSchema'
import { User } from '../schema/userSchema'
import { Company } from '../schema/companySchema'

const router  = express.Router()
router.use(json())

router.get('/',(req:Request,res:Response) => {
    console.log("fsdfsdf")
    
    res.json({
        aaa:"asafdfsdfdds"
    })
})

let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "23284279f95fc8",
      pass: "b62a5e30670c59"
    }
  })

router.post('/', async(req:Request,res:Response) => {
    const { companyId,userId,roleId } = req.body

     await Invite.create({
        companyId,
        userId,
        roleId,
        active:true
    })

    const user  = await User.findById(userId)
    console.log(user?.email)
    const company = await Company.findById(companyId)
        
      let info = await transporter.sendMail({
        from: user?.email,
        to: "budyonevistep@gmail.com",
        subject: `Hello from company ${company?.name}`,
        text: "Invitation",
        html: "http://localhost:3004/api/v1/invitations/",
        headers: { 'x-cloudmta-class': 'standard' }
      })

      console.log("Message sent: %s", info.response)

    res.json({
        aaa:"asa"
    })
})
 
export { router as inviteRouter }