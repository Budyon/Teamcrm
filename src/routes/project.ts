import express from 'express'
import { Project }  from '../schema/projectSchema'
import { Request, Response } from 'express'
import { Role } from '../schema/roleSchema'
import { User } from '../schema/userSchema' 
import { Company } from '../schema/companySchema'
import { upload } from '../util'

const router  = express.Router({ mergeParams: true })

router.get("/:id",async (req,res)=>{
    const project = await Project.findById(req.params.id)
    res.json(project)
})
router.post('/',upload.single("logo"), async (req:Request,res:Response) => {
    try {
        
        const company = await Company.findById(req.params.companyId)
        const role = await Role.findOne({name:'Project manager'})
        const user = await User.findById(req.user?.id)

        const updated = req.body
            
        if (req.file && req.file.path) {
            updated.photo = 'http://localhost:3004/uploads/' + req.file?.filename
        }

        if(role?.id === user?.role?.toString()) {
            const project = await Project.create({
               ...updated,
                owner_id:req.user?.id,
                companyId:req.params.companyId
            })
            console.log(project?._id)
            console.log(req.user)
            
            
            // company?.projects.push({
            //     user_owner:req.user?.id,
            //     project:project?.id
            // })
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
            const project = await Project.findByIdAndUpdate(req.body)
            res.json(project)
        }else {
            res.status(403).json({
                error:"You don't Project Manager and dont Update project" 
            })
        }
    
    } catch (error) {
        res.status(404).json(error)
    }
})
   
router.post('/:id/task', async (req:Request,res:Response) => {
    try {
        const project = await Project.findById(req.params.id)
        
        project?.tasks.push(req.body)

        await project?.save()
    }
    catch (error) {
        console.log(error)
    }
})

export { router as projectRouter }
   