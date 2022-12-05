import express from 'express'
import { Project }  from '../schema/projectSchema'
import { Request, Response } from 'express'
import { Role } from '../schema/roleSchema'
import { User } from '../schema/userSchema' 
import { Company } from '../schema/companySchema'
import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import path  from 'path'

const router  = express.Router({ mergeParams: true })

const projectStorage = multer.diskStorage({
    destination: function(req, file, cb) {
       cb(null, path.resolve('./src/storage/project')) 
    },
    filename: function (req, file, cb) {
        const type = file.originalname.split(".")
        cb(null, uuidv4() + "." + type[1])
    }
})
const upload = multer({
    storage: projectStorage,
    limits : {fileSize : 1000000}
})

router.post('/',upload.single("logo"), async (req:Request,res:Response) => {
    try {
        const company = await Company.findById(req.params.companyId)
        const role = await Role.findOne({name:'Project manager'})
        const user = await User.findById(req.token.user_id)
        if(role?.id === user?.role?.toString()) {
            const { name, owner_id, description, address, webpage, phonenumber } = req.body
            
            
            const project = await Project.create({
                name,
                logo:req.file?.path,
                owner_id,
                description,
                address,
                webpage,
                phonenumber,
                companyId:req.params.companyId
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
    }else {
        res.status(404).json({
            error:"You dont Project Manager and dont create project" 
        })
    }
    
    } catch (error) {
        console.log(error)
    }
})

router.put('/', async (req:Request,res:Response) => {
    try {
        const role = await Role.findOne({name:'Project manager'})
        const user = await User.findById(req.token.user_id)
        if(role?.id === user?.role?.toString()) {
            const { name,logo,description,address,webpage,phonenumber } = req.body
            const project = await Project.findByIdAndUpdate({
                name,
                logo,
                description,
                address,
                webpage,
                phonenumber,
            })

            res.json(project)
        }else {
            res.status(404).json({
                error:"You don't Project Manager and dont Update project" 
            })
        }
    
    } catch (error) {
        res.status(404).json(error)
        console.log(error)
    }
})
   
router.post('/:id/task', async (req:Request,res:Response) => {
    try {
            const { taskName,description,photo,setPriority,dueData,assignMember } = req.body
            const project = await Project.findById(req.params.id)
            
            project?.tasks.push({
                taskName,
                description,
                photo,
                setPriority,
                dueData,
                assignMember,
                creator:req.token.user_id
            })

        await project?.save()
    }
    catch (error) {
        console.log(error)
    }
})

export { router as projectRouter }
   