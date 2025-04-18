import taskModel from "../models/taskModel.js";
import userModel from "../models/userModel.js";


export const CreateTask = async(req,res) => {
    const {userId,title,description,date} = req.body;
    
    if ((!title || !date) && title.length >= 1){
        return res.json({success:false, message: "Missing title or date, must have content in title"})
    }
    try{
        

        if (!userId){
            return res.json({success:false, message: "No UserId"} )
        }

        const user = await userModel.findById(userId)

        if (!userId){
            return res.json({success:false, message: "No User infomation"} )
        }


        const task = new taskModel({ email:user.email, title:title, description: description, date:date });
        
        await task.save();

        return res.json({success:true, message: "Successfully created new task", data: await taskModel.find({email: user.email,title:title, description: description, date:date})})
    }catch(error){
        return res.json({success:false, message: error.message})
    }
}

export const getTasks = async(req,res) =>{

    try{
        const {userId} = req.body;

        if (!userId){
            return res.json({success:false, message: "No UserId"} )
        }

        const user = await userModel.findById(userId)

        if (!user){
            return res.json({success:false, message: "No User"} )
        }
        const task = await taskModel.find({email: user.email});
        console.log(task)
        return res.json({success:true, data:task})
    
    }catch(error){
        return res.json({success: false, message:error.message});
    }
}

export const deleteTask = async(req,res) => {
    const taskId = req.params.id;
    if (!taskId){
        return res.json({success:false, message: "No TaskId"} )
    }
    try{
        const task = await taskModel.findByIdAndDelete(taskId);
        if (!task){
            return res.json({success:false, message: "No Task"} )
        }
        return res.json({success:true, message:"Task Deleted"})
    }catch(error){
        return res.json({success: false, message:error.message});
    }
}

export const updateTask = async(req,res) => {
    const {completed} = req.body;

    const taskId = req.params.id;
    try{
        const task = await taskModel.updateOne({_id: taskId},{completed: completed});
        if (!task){
            return res.json({success:false, message: "No Task"} )
        }

        return res.json({success:true, message:"Task Updated"})

    }catch(error){
        return res.json({success: false, message:error.message});
    }
}