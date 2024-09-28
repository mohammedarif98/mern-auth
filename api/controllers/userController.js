
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
import User from '../models/userModel.js'


export const test = (req,res)=>{
    res.json({msg:"test user api"})
}

export const updateUserProfile = async(req,res,next) => {
    if(req.user.id !== req.params.id){
        // return res.status(401).json("you can only apdate your account")
        return next(errorHandler(401,"You can only update your account"));
    }

    try {
        if(req.body.password){
            req.body.password = bcryptjs.hashSync(req.body.password,10);
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            {$set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePicture: req.body.profilePicture
            }
            },{new: true});

            const {password, ...rest} = updatedUser._doc;
            res.status(200).json(rest);

    } catch (error) {
        // console.log(error);
        next(error)
    }

}