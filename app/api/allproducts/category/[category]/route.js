// api/allproducts/category/[category]/route.js

import ConnectDB from "@/app/DB/ConnectDB";
import Allproducts from "@/app/models/Allproducts";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { category } = params;

    try {
        await ConnectDB();

        // Find products with the specified category
        const productsCategory = await Allproducts.find({
            "products.category": category
        });

        // Extract the products for the specified category
        const filteredProducts = productsCategory.map((categoryItem) => ({
            ...categoryItem.toObject(),
            products: categoryItem.products.filter(
                (product) => product.category === category
            )
        }));

        return NextResponse.json({ productsCategory: filteredProducts });
    } catch (error) {
        return NextResponse.json({ error: error.message });
    }
}
