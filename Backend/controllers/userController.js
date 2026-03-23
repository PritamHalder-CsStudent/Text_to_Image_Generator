import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import e, { json } from "express";
import jwt from 'jsonwebtoken'
import cookieParser from "cookie-parser";




export const registerUser=async(req,res)=>{
    try {
        const {name,email,password}=req.body;
        if(!name || !email || !password){
            return res.json({success:false,message:"please enter all details"})
        }
        const userExists = await userModel.findOne({email})
        if (userExists) {
            return res.json({ success:false, message: 'User already exists' });
        }

        const salt=await bcrypt.genSalt(10)
        const hashedPassword=await bcrypt.hash(password,salt)

        const userData={
            name,
            email,
            password:hashedPassword
        }

        // creating user to save database 
        const user = await userModel.create(userData);

        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})

        res.cookie('token',token ,{
        httpOnly:true, // prevent javascript to access cookie 
        secure:process.env.NODE_ENV === 'production', // use scure cookie in production 
        sameSite:process.env.NODE_ENV === 'production' ? 'none': 'strict', // CSRF protection
        maxAge:7*24*60*60*1000,
        })

        return res.json({ success:true, user:{email:user.email,name:user.name}})


    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


export const loginUser=async(req,res)=>{
    try {
       const {email,password}=req.body;
       const user=await userModel.findOne({email})
       if(!user){
        return res.json({success:false,message:"User does not exist"})
       }
       const isMatch=await bcrypt.compare(password,user.password)
       if(isMatch){
        const token=jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})

        res.cookie('token',token ,{
        httpOnly:true, // prevent javascript to access cookie 
        secure:process.env.NODE_ENV === 'production', // use scure cookie in production 
        sameSite:process.env.NODE_ENV === 'production' ? 'none': 'strict', // CSRF protection
        maxAge:7*24*60*60*1000,
        })

        return res.json({ success:true, user:{email:user.email,name:user.name}})

       }else{
        return res.json({success:false,message:"Invalid credentials"})
       }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export const userCredit=async(req,res)=>{
    try {
        const userId = req.userId;
        const user=await userModel.findById(userId).select("-password")
        res.json({success:true,credit:user.creditBalance,user:{name:user.name}})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}



export const logout=async(req,res)=>{
    try {
        res.clearCookie('token',{
            httpOnly:true,
            secure:process.env.NODE_ENV === 'production',
            sameSite:process.env.NODE_ENV === 'production' ? 'none': 'strict', 
        });

        return res.json({success:true,message:"logout"})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}












// http://localhost:4000/api/user/register
// http://localhost:4000/api/user/login