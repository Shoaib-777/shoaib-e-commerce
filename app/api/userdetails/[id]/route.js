import ConnectDB from "@/DB/ConnectDB";
import User from "@/models/User";
import { NextResponse } from "next/server";

export const GET = async(req,{params})=>{
    const {id}= await params;
    if(!id) {
        return NextResponse.json({message:"id is required"},{status:400})
    }
    try {
        await ConnectDB()
        const user = await User.findById(id)
        if(!user){
            return NextResponse.json({message:"no user exist with this id"},{status:404})
        }
        return NextResponse.json({data:user,message:"user data fetch sucessfully!"},{status:200})
    } catch (error) {
        console.log("error fetching user data",error)
        return NextResponse.json({message:"Internal Server Error"},{status500})
        
    }
}