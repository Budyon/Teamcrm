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

        const updated = req.body
        if (req.file && req.file.path) {
            updated.logo = 'http://localhost:3004/uploads/' + req.file?.filename
        }
        
        const company = await Company.create(updated)
        const role = await Role.findOne({ name:'Company owner' })
        
        await User.findByIdAndUpdate(req.user?._id,{
            role:role?._id,
            companyId:company.id,
            companyName:company.name },{ new:true })
            
            company.users.push({
            user:req.user?._id,
            role:role?._id
        })

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
        const company = await Company.findById(req.params.id)
        .populate({
        path: 'users',
        model: 'User',
        select: 'firstname id photo'
        })
        console.log(company)
        res.json(company)
    } catch (error) {
        console.log(error)
        
        res.status(401).json({
            error:error
        })
    }
        // const company = await Company.findById(req.params.id)

        // company?.users.forEach(async element => {

            // const user = await User.findById(element.user?._id).populate('firstname')
            
        // })
         
            
            // const t: string = doc.child.name;
        // const company = await Company.findById(req.params.id)
        // company?.users[0].user.populate({
        //     firstname
        // })
        // let arr:any = []
        // company?.users.forEach ( async (element,index) =>  {
        //     const user = await User.findById(element.user)

        //     let obj = {}
        //     obj = {
        //         id:user?.id,
        //         firstname:user?.firstname,
        //         photo:user?.photo
        //     }
        //     arr[index] = obj
        // })

        // setTimeout(() => {
        //     res.status(200).json({
        //         company:new CompanyDto(company),
        //         users:arr
        //     })
        //   }, 1000)
        
    })

export { router as companyRouter }

