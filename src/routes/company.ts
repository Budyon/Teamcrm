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
            owner_id:req.token.user_id,
            description,
            address,
            webpage,
            phonenumber
        })
        const role = await Role.findOne({ name:'Company owner' })
        
        await User.findByIdAndUpdate(req.token.user_id,{
            role:role?._id,
            companyId:company.id },{ new:true })

            company.users.push({
            user:req.token.user_id,
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
        let arr:any = []
        const company = await Company.findById(req.params.id)
        company?.users.forEach ( async (element,index) =>  {
            const user = await User.findById(element.user)
            
            let obj = {}
            obj = {
                id:user?.id,
                firstname:user?.firstname,
                photo:user?.photo
            }
            arr[index] = obj
        })
        setTimeout(() => {
            res.status(200).json({
                data:arr
            })
          }, 1000)
        
        
    } catch (error) {
        res.status(401).json({
            message:error
        })
    }
    
    
    // const user = company?.users[0].user
    // console.log(company?.users[0].user?._id)

//     User.findOne({id:company?.users[0].user?._id}).populate("firstname")
//    .then(user => {
//       res.json(user)
//    });
    
    // company?.users.forEach(element => {
    //     console.log(element)

        
    // });
    
    // res.json(new CompanyDto(company))
})

let arr = []

for(let i=0;i<3;i++) {
    arr[i] = 'i'
}
console.log(arr)


console.log('sdfsdfds')


export { router as companyRouter }