import express from "express"
import userAuth from "../middleware/userAuth.js";
import { CreateTask, deleteTask, getTasks, updateTask } from "../controllers/taskController.js";

const taskRouter = express.Router()

taskRouter.post("/create-task", userAuth, CreateTask );
taskRouter.get("/get-tasks", userAuth, getTasks );
taskRouter.delete("/delete-task/:id", userAuth, deleteTask );
taskRouter.put("/update-task/:id", userAuth, updateTask );



export default taskRouter;