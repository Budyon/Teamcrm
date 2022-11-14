import express, { response } from 'express'
import { json } from 'body-parser'
import  { Company }  from '../schema/companySchema'
import { Request, Response } from 'express'
import { Role } from '../schema/roleSchema'
import { User } from '../schema/userSchema' 

const router  = express.Router()

router.use(json())

router.post("/",async (req: Request, res: Response) => {
                       
    try {
        const { name,logo,description,address,webpage,phonenumber } = req.body
         const company = await Company.create({
            name,
            logo,
            description,
            address,
            webpage,
            phonenumber
        })
        
        const role = await Role.findOne({name:'Company owner'})
        
        await User.findByIdAndUpdate(req.token.user_id,{
            role:role?._id
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

export { router as companyRouter}