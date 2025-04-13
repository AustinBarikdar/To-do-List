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
            return res.json({success:false, message: "No User infomormation"} )
        }


        const task = new taskModel({ userId:user._id, title:title,description: description, date:date });
        
        await task.save();

        return res.json({success:true, message: "Successfully created new task"})
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
        const task = await taskModel.find({userId: user._id });

        return res.json({success:true, data:task})
    
    }catch(error){
        return res.json({success: false, message:error.message});
    }
}