//api/address/[id]/route.js

import ConnectDB from "@/app/DB/ConnectDB";
import Address from "@/app/models/Address";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
    const {id} = params
    try {
        await ConnectDB()
        const singleAddress = await Address.findById(id)
        return NextResponse.json({"userAddress":singleAddress})
    } catch (error) {
        return NextResponse.json({message:"error",error})
    }
}

export async function DELETE(req,{params}) {
    const {id} = params
    try {
        await ConnectDB()
        const singleAddress = await Address.findByIdAndDelete(id)
        if(!singleAddress){
            return NextResponse.json({message:singleAddress})
        }
        return NextResponse.json({message:"user Deleted Sucessfully"})
    } catch (error) {
        return NextResponse.json({message:"error",error})
    }
}