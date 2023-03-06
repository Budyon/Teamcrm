import express from 'express'
import { Project }  from '../schema/projectSchema'
import { Request, Response } from 'express'
import { Role } from '../schema/roleSchema'
import { User } from '../schema/userSchema' 
import { Company } from '../schema/companySchema'
import { upload } from '../util'
import { projectDto } from '../dto/project/projectDto'
import { Column } from 'src/schema/ColumnSchema'

const router  = express.Router({ mergeParams: true })

router.get("/:id",async (req,res)=>{
    const project = await Project.findById(req.params.id)
    res.status(200).json(new projectDto(project))
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
            
            company?.projects.push({
                user_owner:req.user?.id,
                project:project?.id
            })

            project?.users.push(
                req.user?.id,
            )
            console.log(req.user?.id)
            
            await User.findByIdAndUpdate(req.user?.id,{
                projects:project?.id,
            })

            await project?.save()
            await company?.save()
            
            res.json(new projectDto(project))
    }else {
        res.status(404).json({
            error:"You dont Project Manager and dont create project" 
        })
    }
    
    } catch (error) {
        res.status(401).json({
            messsage:error
        })
    
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
        
        await project?.save()
    }
    catch (error) {
        console.log(error)
    }
})

router.post('/:id/column', async (req:Request,res:Response) => {
    try {
        const project = await Project.findById(req.params.id)

        const column = Column.create(req.body)

        // project?.column.push(req.body)
        
        await project?.save()
    }
    catch (error) {
        console.log(error)
    }
})





export { router as projectRouter }
   