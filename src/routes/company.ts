import express from 'express'
import { json } from 'body-parser'
import  { Company }  from '../schema/companySchema'
import { Request, Response } from 'express'
import { Role } from '../schema/roleSchema'
import { User } from '../schema/userSchema'
import { projectRouter } from './project'
import { upload } from '../util'

const router  = express.Router()

router.use(json())
router.use('/:companyId/projects',projectRouter)

router.post("/",upload.single('logo'), async (req: Request, res: Response) => {
    
    try {
        const { name,description,address,webpage,phonenumber } = req.body
         const company = await Company.create({
            name,
            logo:req.file?.path,
            owner_id:req.token.user_id,
            description,
            address,
            webpage,
            phonenumber
        })
        console.log(company)
        
        
        const role = await Role.findOne({name:'Company owner'})
        
        await User.findByIdAndUpdate(req.token.user_id,{
            role:role?._id,
            companyId:company.id
        })
        company.users.push({
            user:req.token.user_id,
            role:role?._id
        })
         
        await company.save()
        
        res.json(company)

    } catch (error) {
        console.log(error)
    }
})

router.get("/:id",async (req,res)=>{
    const company = await Company.findById(req.params.id)
    res.json(company)
})

export { router as companyRouter }