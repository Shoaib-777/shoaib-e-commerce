import { auth } from "@/app/auth";
import ConnectDB from "@/app/DB/ConnectDB";
import Address from "@/app/models/Address";
import { NextResponse } from "next/server";

export async function GET(req) {
    const { user } = await auth();
    try {
        await ConnectDB();
        // Adjusted the query to match userDetails structure
        const userAddress = await Address.find({ "userDetail.userName": user.username });
        if (!userAddress) {
            return NextResponse.json({ message: "Address not found" });
        }
        return NextResponse.json({"userAddress":userAddress });
    } catch (error) {
        return NextResponse.json({ message: "Error occurred", error });
    }
}
