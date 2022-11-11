import express, { response } from 'express'
import { json } from 'body-parser'
import  { Company }  from '../schema/companySchema'
import { Request, Response } from 'express'
import endpoint from '../../endpoints.config';
import { Role } from '../schema/roleSchema'
import { request } from 'http';

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
        console.log(req.token.user_id)
        console.log(req.token)
        
        
        const role = await Role.findOne({name:'Company owner'})
        
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