import mongoose from 'mongoose';
import express from 'express';
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoute.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

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


app.listen(port,()=>{
    console.log(`server running in port ${port}`); 
})

