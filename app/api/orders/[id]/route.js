//api/orders/[id]/route.js

import ConnectDB from "@/app/DB/ConnectDB";
import Orders from "@/app/models/orders";
import { NextResponse } from "next/server";

export async function GET(req,{params}) {
    const {id} = params
    try {
        await ConnectDB()
        const singleOrder = await Orders.findById(id)
        return NextResponse.json({"userOrder":singleOrder})
    } catch (error) {
        return NextResponse.json({message:"error",error})
    }
}

export async function DELETE(req,{params}) {
    const {id} = params
    try {
        await ConnectDB()
        const singleOrder = await Orders.findByIdAndDelete(id)
        if(!singleOrder){
            return NextResponse.json({message:singleOrder})
        }
        return NextResponse.json({message:"user Deleted Sucessfully"})
    } catch (error) {
        return NextResponse.json({message:"error",error})
    }
}