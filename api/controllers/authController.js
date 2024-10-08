import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';



export const signUp = async(req,res,next)=>{
    try {
        const { username,email,password } = req.body;

        const existingUser = await User.findOne({ email });
        if(existingUser){
            throw errorHandler(400, " User is already exists");
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
        const validUser = await User.findOne({ email });
        if(!validUser) return next(errorHandler(404,"user not found"));
        
        const validPassword = bcryptjs.compareSync(password,validUser.password);
        if(!validPassword) return next(errorHandler(404,"invalid credential "));

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

export const googleAuth = async(req,res,next)=>{

    const user = await User.findOne({ email:req.body.email });
    if(user){
        const token = jwt.sign({id: user._id},process.env.JWT_SECRET);
        const { password:hashPassword,...rest } = user._doc;
        const expirtDate = new Date(Date.now() + 3600000)  //1 hr
        res.cookie('access_token',token,{ httpOnly: true,expires:expirtDate }).status(200).json(rest);
    }else{
        const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptjs.hashSync(generatedPassword,10);
        const newUser = new User({
            username: req.body.name.split(' ').join('').toLowerCase() + Math.floor(Math.random() * 1000).toString(),
            email: req.body.email,
            password: hashedPassword,
            profilePicture: req.body.photo,
        })
        await newUser.save();
        const token = jwt.sign({id: newUser._id},process.env.JWT_SECRET);
        const { password:hashPassword,...rest } = newUser._doc;
        const expirtDate = new Date(Date.now() + 3600000)  //1 hr
        res.cookie('access_token',token,{ httpOnly: true,expires:expirtDate }).status(200).json(rest);
    }

}

export const signOut = async(req,res,next) => {
    try {
        res.clearCookie('access_token').status(200).json("SignOut successfully")
    } catch (error) {
        next(error)
    }
}