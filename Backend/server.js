import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import userRouter from './routes/userRoutes.js'
import cookieParser from "cookie-parser";
import imageRouter from './routes/imageRoutes.js'


const PORT=process.env.PORT || 4000
const app=express()

// allow muliple origins
const allowedOrigins=['http://localhost:5173']

// middleware configaration 
app.use(express.json())
app.use(cookieParser());
app.use(cors({origin:allowedOrigins,credentials:true}))

await connectDB()


app.use('/api/user',userRouter)
app.use('/api/image',imageRouter)
app.get('/',(req,res)=>res.send("API working"))
app.listen(PORT,()=>console.log('server running on port ' +PORT))