import ConnectDB from "@/DB/ConnectDB";
import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { id } = await params;
    if (!id) {
        return NextResponse.json({ message: "id is required" }, { status: 400 });
    }
    try {
        await ConnectDB();
        const data = await Product.findById(id);

        if (!data) {
            return NextResponse.json({ message: "data not found for product" },{ status: 404 });
        }
        
        return NextResponse.json({ message: "data found", data },{ status: 200 });
    } catch (error) {
        console.error("Internal Server Error", error);
        return NextResponse.json({ message: "Internal server error", error: error.message },{ status: 500 });
    }
}
