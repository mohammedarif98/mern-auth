import mongoose from 'mongoose';
import express from 'express';
import cookieParser from 'cookie-parser';
import path from 'path';
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoute.js';
import dotenv from 'dotenv';

dotenv.config();

const __dirname = path.resolve();

const app = express();

app.use(express.static(path.join(__dirname,'/client/dist')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'));
});

app.use(express.json());
app.use(cookieParser());

mongoose.connect(process.env.MONGO).then(()=>{
    console.log(`connected to mongodb`);
}).catch((error)=>{
    console.log(`error occur : ${error}`);
})


app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || "internal server error";
    return res.status(statusCode).json({ success: false,message,statusCode });
});


const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server running in port ${port}`); 
})

