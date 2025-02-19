import express from "express";
import cors from "cors";
import 'dotenv/config';
import cookieParser from "cookie-parser";

import connectDB from './config/mangodb.js'

const app = express();
const port = process.env.PORT || 4000

connectDB();

app.use(express.json());
app.use(cookieParser())
app.use(cors({credentials: true})) //send the cookies in the response from the express app


app.get('/', (req,res) => res.send("API Working"))


app.listen(port, ()=> console.log(`Sever started on port:${port}`));