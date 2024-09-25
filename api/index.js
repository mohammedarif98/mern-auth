import mongoose from 'mongoose';
import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = 5000;

mongoose.connect(process.env.MONGO).then(()=>{
    console.log(`connected to mongodb`);
}).catch((error)=>{
    console.log(`error occur : ${error}`);
})

 
app.listen(port,()=>{
    console.log(`server running in port ${port}`); 
})