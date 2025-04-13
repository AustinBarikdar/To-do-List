import express from "express"
import userAuth from "../middleware/userAuth.js";
import { CreateTask, getTasks } from "../controllers/taskController.js";

const taskRouter = express.Router()

taskRouter.post("/create-task", userAuth, CreateTask );
taskRouter.get("/get-tasks", userAuth, getTasks );


export default taskRouter;