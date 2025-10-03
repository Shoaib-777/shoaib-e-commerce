import ConnectDB from "@/DB/ConnectDB";
import Cart from "@/models/Cart";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// ------------------ GET ------------------
export const GET = async (req, { params }) => {
    const { id } = await params
    if (!id) {
        return NextResponse.json({ message: "User ID required" }, { status: 400 });
    }
    try {
        await ConnectDB();
        const cart = await Cart.findOne({ user: id }).populate("items.product");
        if (!cart) {
            return NextResponse.json({ data: [] }, { status: 200 });
        }

        return NextResponse.json(cart, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
    }
};


// ------------------ DELETE ------------------
export const DELETE = async (req, { params }) => {
    const { id: userId } = params;
    if (!userId) return NextResponse.json({ message: "User ID required" }, { status: 400 });

    try {
        await ConnectDB();
        const { searchParams } = new URL(req.url);
        const itemId = searchParams.get("itemId"); // use the cart item _id

        let cart;
        if (itemId) {
            // Pull by the item's _id
            cart = await Cart.findOneAndUpdate(
                { user: userId },
                { $pull: { items: { _id: new mongoose.Types.ObjectId(itemId) } } },
                { new: true }
            );
        } else {
            // Remove all items if no itemId provided
            cart = await Cart.findOneAndUpdate(
                { user: userId },
                { $set: { items: [] } },
                { new: true }
            );
        }

        if (!cart) return NextResponse.json({ message: "Cart not found" }, { status: 404 });
        return NextResponse.json({ message: "Deleted successfully", cart }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
    }
};
