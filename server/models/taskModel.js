import mongoose from "mongoose"



const Taskschmea = new mongoose.schmea({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: {type: String, required: true},
    text: { type: String, required: true },
    completed: { type: Boolean, default: false },
    priority: {type: number, default: 0},


})


const taskModel = mongoose.model.task || mongoose.model('task',Taskschmea);

export default taskModel;