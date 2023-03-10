import express from 'express'
import { User } from '../database/schema/userSchema'
import { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import { upload } from '../util'
import { UserDto } from '../dto/user/UserDto'
import { Company } from '../database/schema/companySchema'
import { CompanyDto } from '../dto/company/CompanyDto'

const router = express.Router()

router.put('/', upload.single('photo'),
    body('firstname').isString().optional(),
    body('lastname').isString().optional(),
    async (req: Request<{}, {}>, res: Response) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }

            const updated = req.body
            
            if (req.file && req.file.path) {
                updated.photo = 'http://localhost:3004/uploads/' + req.file?.filename
            }

             const user = await User.findByIdAndUpdate(req.user?._id, updated, {new: true})
            
            return res.json({
                success: 'User Successfully updated',
                data: new UserDto(user),
            })
        } catch (error) {
            res.status(404).json(error)
        }
    })

router.get('/', async (req, res) => {
    
    const user = await User.findById(req.user).populate({
        path: 'company',
        model: 'Company',
        select: 'id name logo'
      })
      
    res.json(new UserDto(user))
})

router.get('/:id', async (req, res) => {
    const user = await User.findById(req.params.id).populate({
        path: 'company',
        model: 'Company',
        select: 'id name logo address',
    }).populate({
        path:'projects',
        model: 'Project',
        select:'id name logo'
      })
      
      res.status(200).json(new UserDto(user))
})

router.post('/search',async ( req,res ) => {

    const users = await User.find({})
    const company = await Company.find({})
    const getUsers:any = []
    const getCompany:any = []
    users.forEach(element => {

        const lowerFirst = element.firstname.toLowerCase()
        const lowerLast = element.lastname.toLowerCase()
        
        if(lowerFirst.includes(req.body.text.toLowerCase()) || lowerLast.includes(req.body.text.toLowerCase()) ) {
            getUsers.push(new UserDto(element))
        }
    })
    company.forEach(element => {
        const lowerName = element.name.toLowerCase()
        if(lowerName.includes(req.body.text.toLowerCase()) ) {
            getCompany.push(new CompanyDto(element))
        }
    })
    res.json({
        users:getUsers,
        companies:getCompany
    })
})

export { router as userRouter }