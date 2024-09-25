import mongoose from 'mongoose';
import express from 'express';
import userRoutes from './routes/userRoute.js';
import authRoutes from './routes/authRoute.js';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 5000;

app.use(express.json());

mongoose.connect(process.env.MONGO).then(()=>{
    console.log(`connected to mongodb`);
}).catch((error)=>{
    console.log(`error occur : ${error}`);
})


app.use('/api/user',userRoutes);
app.use('/api/auth',authRoutes);

app.listen(port,()=>{
    console.log(`server running in port ${port}`); 
})