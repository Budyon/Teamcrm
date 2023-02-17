import express from 'express'
import { Request, Response } from 'express'
import nodemailer from 'nodemailer'
import { auth } from '../util'
import { inviteCompany } from '../schema/inviteSchema'
import { inviteProject } from '../schema/inviteSchema'
import { User } from '../schema/userSchema'
import { Company } from '../schema/companySchema'
import { Role } from '../schema/roleSchema'
import { Project } from '../schema/projectSchema'

const router  = express.Router()

let transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "23284279f95fc8",
      pass: "b62a5e30670c59"
    }
  })

router.get('/company/:id',async(req:Request,res:Response) => {
    try {
        const invitecompany = await inviteCompany.findById(req.params.id)
            if(invitecompany?.active === true) {
                const company = await Company.findById(invitecompany.companyId)
                
                if(invitecompany?.userId){
                    company?.users.push(invitecompany?.userId)
                }
                
                await User.findByIdAndUpdate(invitecompany.userId,{
                    role:invitecompany.roleId,
                    company:invitecompany.companyId
                })

                await company?.save()

                invitecompany.active = false
                await invitecompany.save()

                res.json({
                    Success:"You are successfully join in our company"
                })
            }else {
                res.json({
                    error:"The invitation has already expired"
                })
            }
    } catch (error) {
        res.json(error)
    }
})

router.get('/project/:id',async(req:Request,res:Response) => {
    
    try {
        const inviteprojects = await inviteProject.findById(req.params.id)

            if(inviteprojects?.active === true) {
                const project = await Project.findById(inviteprojects?.projectId)
                console.log(inviteprojects)
                
                // project?.users.push({
                //     user:inviteprojects.userId,
                //     contractDate:inviteprojects.contractDate
                // })
                await User.findByIdAndUpdate(inviteprojects.userId,{
                    role:inviteprojects.roleId
                })

                await project?.save()

                inviteprojects.active = false
                await inviteprojects.save()

                res.json({
                    Success:"You are already in our project"
                })
            }else {
                res.json({
                    error:"The invitation has already expired"
                })
            }
    } catch (error) {
        res.json(error)
    }
})

router.post('/company', auth, async(req:Request,res:Response) => {
    try {
        const { companyId,userId,roleName } = req.body
        const role = await Role.findOne({name:roleName})
        const roleId = role?._id
        
        const user  = await User.findById(userId)
        const company = await Company.findById(companyId)

        const invite = await inviteCompany.create({
            companyId,
            userId,
            roleId,
            active:true
        })
    
        const output = `<h1>Hi, we invite you to our company as a ${role?.name}, if you accept the offer, click the link below</h1>
        <a href="${`http://localhost:3004/api/v1/invitations/company/${invite._id}`}">Click here</a>`
            
          await transporter.sendMail({
            from: req.user?.email,
            to: user?.email,
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

router.post('/project',  async(req:Request,res:Response) => {
    try {
        
    const { projectId,userId,roleId,contractDate } = req.body
    const project = await Project.findById(projectId)
    const user  = await User.findById(userId)
    const boolean = project?.users.toString().includes(userId)

    if(contractDate > new Date && project !== null && !boolean) {
                const invite = await inviteProject.create({
                    ...req.body,
                    active:true
                })
            
                const output = `<h1>Hi, we invite you to our project as a , if you accept the offer, click the link below</h1>
                <a href="${`http://localhost:3004/api/v1/invitations/project/${invite._id}`}">Click here</a>`
                    
                await transporter.sendMail({
                    from: user?.email,
                    to: "budyonevistep@gmail.com",
                    subject: `Hello from project ${project?.name}`,
                    text: "Invitation",
                    html: output, 
                    headers: { 'x-cloudmta-class': 'standard' }
                })
            
                res.json({
                    Success:"Your invitation has arrived successfully"
                })
        }   
    } catch (error) {
        res.status(404).json(error)
    }
})



 
export { router as inviteRouter }
   