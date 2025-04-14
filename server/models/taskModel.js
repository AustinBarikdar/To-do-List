import mongoose from "mongoose"



const Taskschmea = new mongoose.Schema({
    email: { type: String, ref: "User", required: true },
    title: {type: String, required: true},
    description: { type: String, required: true },
    date: {type: String, required: true},
    completed: { type: Boolean, default: false },


})


const taskModel = mongoose.models.task || mongoose.model('task',Taskschmea);

export default taskModel;