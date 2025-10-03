import { NextResponse } from "next/server";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import ConnectDB from "@/DB/ConnectDB";



// ------------------ POST ------------------
export const POST = async (req) => {
    const body = await req.json();
    const { userId, type, productId, products } = body;
    if (!userId) return NextResponse.json({ message: "User ID required" }, { status: 400 });
    try {
        await ConnectDB();
        if (type === "single_add") {
            if (!productId) return NextResponse.json({ message: "Product ID required" }, { status: 400 });
            const cart = await Cart.findOneAndUpdate(
                { user: userId,"items.product":{ $ne: productId } },
                { $addToSet:{ items:{ product: productId,quantity:1 } } },
                { upsert:true,new:true }
            );
            if (!cart.items.find(i=>i.product.toString()===productId)) {
                await Cart.findOneAndUpdate(
                    { user:userId,"items.product":productId },
                    { $inc:{ "items.$.quantity":1 } },
                    { new:true }
                );
            }
            return NextResponse.json(cart,{ status:201 });
        }
        if (type === "multiple_add") {
            if (!products || !Array.isArray(products)) return NextResponse.json({ message: "Products array required" }, { status: 400 });
            let cart = await Cart.findOneAndUpdate(
                { user:userId },
                { $setOnInsert:{ items:[] } },
                { upsert:true,new:true }
            );
            for (const p of products) {
                const exists = cart.items.find(i=>i.product.toString()===p.productId);
                if (exists) {
                    await Cart.findOneAndUpdate(
                        { user:userId,"items.product":p.productId },
                        { $inc:{ "items.$.quantity":p.quantity||1 } },
                        { new:true }
                    );
                } else {
                    await Cart.findOneAndUpdate(
                        { user:userId },
                        { $addToSet:{ items:{ product:p.productId,quantity:p.quantity||1 } } },
                        { new:true }
                    );
                }
            }
            cart = await Cart.findOne({ user:userId });
            return NextResponse.json(cart,{ status:201 });
        }
    } catch (error) {
        return NextResponse.json({ message:"Internal server error",error:error.message },{ status:500 });
    }
};

export const PUT = async (req) => {
    const body = await req.json();
    const { userId, productId, action } = body;
    if (!userId || !productId) return NextResponse.json({ message: "User ID & Product ID required" }, { status: 400 });
    try {
        await ConnectDB();
        if (action==="increase") {
            const cart = await Cart.findOneAndUpdate(
                { user:userId,"items.product":productId },
                { $inc:{ "items.$.quantity":1 } },
                { new:true }
            );
            return NextResponse.json(cart,{ status:200 });
        }
        if (action==="decrease") {
            let cart = await Cart.findOne({ user:userId,"items.product":productId });
            if (!cart) return NextResponse.json({ message:"Cart not found" },{ status:404 });
            const item = cart.items.find(i=>i.product.toString()===productId);
            if (!item) return NextResponse.json({ message:"Item not in cart" },{ status:404 });
            if (item.quantity>1) {
                cart = await Cart.findOneAndUpdate(
                    { user:userId,"items.product":productId },
                    { $inc:{ "items.$.quantity":-1 } },
                    { new:true }
                );
            } else {
                cart = await Cart.findOneAndUpdate(
                    { user:userId },
                    { $pull:{ items:{ product:productId } } },
                    { new:true }
                );
            }
            return NextResponse.json(cart,{ status:200 });
        }
    } catch (error) {
        return NextResponse.json({ message:"Internal server error",error:error.message },{ status:500 });
    }
};



