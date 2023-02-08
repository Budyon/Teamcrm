import express from 'express'
import { json } from 'body-parser'
import  { Company }  from '../schema/companySchema'
import { Request, Response } from 'express'
import { Role } from '../schema/roleSchema'
import { User } from '../schema/userSchema'
import { projectRouter } from './project'
import { upload } from '../util'
import { CompanyDto } from '../dto/company/CompanyDto'

const router  = express.Router()

router.use(json())
router.use('/:companyId/projects',projectRouter)

router.post("/",upload.single('logo'), async (req: Request, res: Response) => {
    
    try {
        const user = await User.findById(req.user?._id)

        if(user?.company !== undefined) {
            return res.status(400).json({
                message:'You already created companies'
            })
        }

        const updated = req.body
        if (req.file && req.file.path) {
            updated.logo = 'http://localhost:3004/uploads/' + req.file?.filename
        }
        
        const company = await Company.create(updated)
        const role = await Role.findOne({ name:'Company owner' })
        
        await User.findByIdAndUpdate(req.user?._id,{
            role:role?._id,
            company:company.id,
        })
            console.log(company,'company')
            
        company.users.push(req.user?._id)

        company.save()
         
        res.json(new CompanyDto(company))

    } catch (error) {
        res.status(401).json({
            error:error
        })
    }
})


router.get("/:id",async (req,res) => {
    try {
        
        const company = await Company.findById(req.params.id).populate({
            path:'users',
            model:'User',
            select:'id firstname photo'
        })  
        
        res.json(company)
        
    } catch (error) {
        res.status(401).json({
            error:error
        })
    }
})

export { router as companyRouter }

