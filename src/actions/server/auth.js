"use server"
import bcrypt from 'bcryptjs';

import { dbConnect } from "@/lib/dbConnect";

export const postUser = async (payload)=>{
    console.log(payload);


    // 0 - validation - password , name , mail 



    //1 - check user exists or not
    
    
    const isExist =  await dbConnect("users").findOne({email:payload.email});
    if(isExist){
        return{
            success: false,
            message: "User already Exists"
        }
    }

    // 2 - create new user 


    const hashPassword = await bcrypt.hash(payload.password,10)

    const newUser = {
        ...payload,
        createdAt : new Date().toISOString(),
        role: "user",
        password: hashPassword,

    }

    console.log(newUser);
    
    // 3 - send user to database


    const result = await dbConnect("users").insertOne(newUser)

    if(result.acknowledged){
        return {
            
            success: true,
            message: `User Created with ${result.insertedId.toString()}`
        }
        
    }

    else{
        return {
            
            success: false,
            message: `Something went wrong. Please try again`
        }
    }



    
}