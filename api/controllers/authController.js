import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';


export const signUp = async(req,res,next)=>{
    try {
        const { username,email,password } = req.body;

        const existingUser = await User.findOne({ email });
        if(existingUser){
            throw errorHandler(400, "----------->User already exists");
            // res.status(400).json({ message: "user is already existed" })
        }

        const hashPassword = bcryptjs.hashSync(password,10);

        const newUser = new User({ username,email,password:hashPassword });
        await newUser.save();
        res.status(201).json({ message: "user created successfully" })

    } catch (error) {
        next(error)
        // next(errorHandler(300,"someting went from"));
        //res.status(500).json(error.message)
    }
} 