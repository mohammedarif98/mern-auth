import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
<<<<<<< HEAD
import jwt from 'jsonwebtoken';
=======
>>>>>>> a8574a26c0c05e419d90c5cd55eed8baebf0abde


export const signUp = async(req,res,next)=>{
    try {
        const { username,email,password } = req.body;

        const existingUser = await User.findOne({ email });
        if(existingUser){
<<<<<<< HEAD
            throw errorHandler(400, "------> User already exists");
=======
            throw errorHandler(400, "----------->User already exists");
>>>>>>> a8574a26c0c05e419d90c5cd55eed8baebf0abde
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


export const signIn = async(req,res,next)=>{
    const { email,password } = req.body;
    try {
        const validUser = await User.findOne({email});
        if(!validUser) return next(errorHandler(404,"----> user not found"));
        
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandler(404,"----> invalid credential "));

        // creating jwt token
        const token = jwt.sign({id: validUser._id},process.env.JWT_SECRET);
        const { password:hashPassword,...rest } = validUser._doc;
        // res.status(200).json({token})
        const expirtDate = new Date(Date.now() + 3600000)  //1 hr
        res.cookie('access_token',token,{ httpOnly: true,expires:expirtDate }).status(200).json(rest);
    } catch (error) {
        next(error)
    }
}