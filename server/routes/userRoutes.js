import { getUser } from "../controllers/userController.js";
import express from "express"
import userAuth from "../middleware/userAuth.js";

const userRouter = express.Router()

userRouter.get("/data",userAuth, getUser);


export default userRouter;

