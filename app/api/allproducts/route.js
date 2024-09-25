import ConnectDB from "@/app/DB/ConnectDB";
import Allproducts from "@/app/models/Allproducts";
import { NextResponse } from "next/server";

export async function GET(req) {
    try {
        await ConnectDB();
        const data = await Allproducts.findOne();
        
        // Assuming `category` is a field inside each product object
        const products = data?.products || [];
        const categories = [...new Set(products.flatMap(product => product.category))];
        
        return NextResponse.json({ products, categories });
    } catch (error) {
        console.log('Error fetching product from DB:', error);
        return NextResponse.json({ message: error.message });
    }
}
