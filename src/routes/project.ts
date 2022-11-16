import express, { response } from 'express'
import { json } from 'body-parser'
import  { Project }  from '../schema/projectSchema'
import { Request, Response } from 'express'
import { Role } from '../schema/roleSchema'
import { User } from '../schema/userSchema' 
import { Company } from '../schema/companySchema'
import { rmSync } from 'fs'

const router  = express.Router({ mergeParams: true })

router.use(json())

router.post('/', async (req:Request,res:Response) => {
    try {
    const { name,logo,description,address,webpage,phonenumber } = req.body
    const company = await Company.findById(req.params.companyId)
    const role = await Role.findOne({name:'Project manager'})
    
    const project = await Project.create({
        name,
        logo,
        description,
        address,
        webpage,
        phonenumber
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
    } catch (error) {
        console.log(error)
    }
    
})

export { router as projectRouter }
 