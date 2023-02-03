import express from 'express'
import { json } from 'body-parser'
import  { Company }  from '../schema/companySchema'
import { Request, Response } from 'express'
import { Role } from '../schema/roleSchema'
import { User } from '../schema/userSchema'
import { projectRouter } from './project'
import { upload } from '../util'
import { CompanyDto } from '../dto/company/CompanyDto'
import { userInfo } from 'os'

const router  = express.Router()

router.use(json())
router.use('/:companyId/projects',projectRouter)

router.post("/",upload.single('logo'), async (req: Request, res: Response) => {
    
    try {
        const { name,description,address,webpage,phonenumber } = req.body
        
         const company = await Company.create({
            name,
            logo:req.file?.path,
            owner_id:req.user?._id,
            description,
            address,
            webpage,
            phonenumber
        })
        const role = await Role.findOne({ name:'Company owner' })
        
        await User.findByIdAndUpdate(req.user?._id,{
            role:role?._id,
            companyId:company.id },{ new:true })

            company.users.push({
            user:req.user?._id,
            role:role?._id
        })

        company.save()
         
        res.json(new CompanyDto(company))

    } catch (error) {
        res.status(404).json({
            error:error
        })
    }
})

router.get("/:id",async (req,res) => {
    try {
        const company = await Company.findById(req.params.id)

        res.status(200).json(new CompanyDto(company))
    } catch (error) {
        res.status(401).json({
            message:error
        })
    }
})

export { router as companyRouter }