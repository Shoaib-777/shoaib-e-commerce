import ConnectDB from "@/DB/ConnectDB";
import Wishlist from "@/models/Wishlist";
import { NextResponse } from "next/server";
import Product from "@/models/Product"

export const GET = async(req,{params})=>{
    const {id} = await params;
    if(!id) {
        return NextResponse.json({message:"id is required"},{status:400})
    }
    try {
        await ConnectDB()
        const data = await Wishlist.find({"user":id}).populate("products")
        if(!data || data.length === 0){
            return NextResponse.json({message:"no data of wishlist found"},{status:202})
        }
        return NextResponse.json({data,message:"user wishlist data fetch sucessfully!"},{status:200})
    } catch (error) {
        console.log("error fetching user wishlist data",error)
        return NextResponse.json({message:"Internal server Error"},{status:500})
    }
}