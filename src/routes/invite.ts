import express from 'express'
import { json } from 'body-parser'
import { Request, Response } from 'express'
import nodemailer from 'nodemailer'
import { auth } from "../util"
import { Invite } from '../schema/inviteSchema'
import { User } from '../schema/userSchema'
import { Company } from '../schema/companySchema'
import { Role } from '../schema/roleSchema'

const router  = express.Router()
router.use(json())

router.get('/:id',async(req:Request,res:Response) => {
    try {
        const invite = await Invite.findById(req.params.id)
        if(invite?.active === true) {

            const company = await Company.findById(invite.companyId)

            company?.users.push({
                user:invite.userId,
                role:invite.roleId
            })
            await company?.save()

            invite.active = false
            await invite.save()
        }else {
            res.json({
                error:"The invitation has already expired"
            })
        }
    } catch (error) {
        console.log(error)
    }
    
    res.json({
        Success:"You are already in our company"
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

router.post('/', auth, async(req:Request,res:Response) => {
    try {
        const { companyId,userId,roleId } = req.body
        const invite = await Invite.create({
            companyId,
            userId,
            roleId,
            active:true
        })
    
        const role = await Role.findById(roleId)
        const user  = await User.findById(userId)
        const company = await Company.findById(companyId)
    
        const output = `<h1>Hi, we invite you to our company as a ${role?.name}, if you accept the offer, click the link below</h1>
        <a href="${`http://localhost:3004/api/v1/invitations/${invite._id}`}">Click here</a>`
            
          await transporter.sendMail({
            from: user?.email,
            to: "budyonevistep@gmail.com",
            subject: `Hello from company ${company?.name}`,
            text: "Invitation",
            html: output, 
            headers: { 'x-cloudmta-class': 'standard' }
          })
    
        res.json({
            Success:"Your invitation has arrived successfully"
        })
    } catch (error) {
        console.log(error)
    }
     
})
 
export { router as inviteRouter }