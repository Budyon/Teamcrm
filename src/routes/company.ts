import express, { response } from 'express'
import { json } from 'body-parser'
import  { Company }  from '../schema/companySchema'
import { Request, Response } from 'express'
import endpoint from '../../endpoints.config';
import { Role } from '../schema/roleSchema'
import { request } from 'http';


const router  = express.Router()
router.use(json())

router.post("/",async (req: Request<{}, {}>, res: Response) => {
    
    try {
        console.log(req)
        const {name,logo,description,address,webpage,phonenumber} = req.body
        
         const company = await Company.create({
            name,
            logo,
            description,
            address,
            webpage,
            phonenumber
        })
                
        if(company) {
            res.json(company)
        }
    } catch (error) {
        console.log(error)
    }
    
}) 

export { router as companyRouter}