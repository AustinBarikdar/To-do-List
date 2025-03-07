import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";

import connectDB from './config/mangodb.js'
import authRouter from './routes/authRoutes.js';
import userRouter from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT || 4000

connectDB();

const allowedorgins = ["http://localhost:5174"]
app.use(express.json());
app.use(cookieParser())
app.use(cors({origin: allowedorgins, credentials: true})) //send the cookies in the response from the express app

//API ENDPOINTS
app.get('/', (req,res) => res.send("API Working"))
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter)

app.listen(port, ()=> console.log(`Sever started on port:${port}`));