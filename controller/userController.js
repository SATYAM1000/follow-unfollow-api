import User from '../model/userModel.js';
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();



//--------------------api for creating a user---------------------------

export const createUser=async(req,res)=>{
    try{
        const userData=await new User(req.body);
        if(!userData){
            return res.status(401).json({message:"Data not found"});
        }
        
        const savedData=await userData.save();
        res.status(200).json(savedData);

    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}


//----------------------------login api----------------------------------

export const login=async(req,res)=>{
    try{
        const {username}=req.body;
        const userExist=await User.findOne({username});
        if(!userExist){
            return res.status(404).json({message:"User does not exist"});
        }
        const token= await jwt.sign({userId: userExist.username}, process.env.SECRET_KEY, {expiresIn:"1h"});
        //----------------storing token in cookie--------------
        res.cookie('token', token, {httpOnly:true, maxAge:3600000})
        res.status(200).json({message:"login successfull!!"})
    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

//--------------------------------------follow unfollow api -------------------------------------------------

export const followUser=async(req,res)=>{
    try{
        const usernameOne=req.userId;
        const usernameTwo=req.params.username;
        const userTwoData=await User.findOne({username:usernameTwo});
        if(!userTwoData){
            return res.staus(404).json({message:"User does not exist"});
        }

        if(!userTwoData.followers.includes(usernameOne)){
            await User.findOneAndUpdate({username:usernameTwo}, {$push:{followers:usernameOne}});
            await User.findOneAndUpdate({username:usernameOne},{$push:{followings:usernameTwo}});

        }
        else{
            return res.status(401).json({message:"You are already a follower"});
        }

        res.status(200).json({message:"Following successfull"});



    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

//---------------------unfollow user api--------------------------------------------------------
export const unfollowUser=async(req,res)=>{
    try{
        const usernameOne=req.userId;
        const usernameTwo=req.params.username;
        const userTwoData=await User.findOne({username:usernameTwo});
        if(!userTwoData){
            return res.staus(404).json({message:"User does not exist"});
        }

        if(userTwoData.followers.includes(usernameOne)){
            await User.findOneAndUpdate({username:usernameTwo}, {$pull:{followers:usernameOne}});
            await User.findOneAndUpdate({username:usernameOne},{$pull:{followings:usernameTwo}});

        }
        else{
            return res.status(401).json({message:"You are not a follower"});
        }

        res.satus(200).json({message:"Unfollowing successfull"});



    }
    catch(error){
        res.status(500).json({error:error.message})
    }
}

//------------------------------------delete username api-----------------------------------------------

export const deleteUser=async(req,res)=>{
    try{
        const id=req.params.username;
        

    }
    catch(error){
        res.status(500).json({error:error.mesage});
    }
}