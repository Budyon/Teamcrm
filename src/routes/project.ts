import express, { response } from 'express'
import { json } from 'body-parser'
import  { Project }  from '../schema/projectSchema'
import { Request, Response } from 'express'
import { Role } from '../schema/roleSchema'
import { User } from '../schema/userSchema' 
import { Company } from '../schema/companySchema'
import { assign } from 'nodemailer/lib/shared'

const router  = express.Router({ mergeParams: true })

router.use(json())

router.post('/', async (req:Request,res:Response) => {
    try {
        const company = await Company.findById(req.params.companyId)
        const role = await Role.findOne({name:'Project manager'})
        const user = await User.findById(req.token.user_id)
        if(role?.id === user?.role?.toString()) {
            const { name,logo,description,address,webpage,phonenumber } = req.body
            const project = await Project.create({
                name,
                logo,
                description,
                address,
                webpage,
                phonenumber,
                companyId:req.params.companyId
            })
            company?.projects.push({
                user_owner:req.token.user_id,
                project:project?._id
            })
            project?.users.push({
                user:req.token.user_id,
                role:role?._id
            })
            await project?.save()
            await company?.save()
        
            res.json(project)
    }else {
        res.status(404).json({
            error:"You dont Project Manager and dont create project" 
        })
    }
    
    } catch (error) {
        console.log(error)
    }
})
   
router.post('/:id/task', async (req:Request,res:Response) => {
    try {
            const { taskName,description,photo,setPriority,dueData,assignMember } = req.body
            const project = await Project.findById(req.params.id)
            
            project?.tasks.push({
                taskName,
                description,
                photo,
                setPriority,
                dueData,
                assignMember,
                creator:req.token.user_id
            })

        await project?.save()
    }
    catch (error) {
        console.log(error)
    }
})

export { router as projectRouter }
   