import ConnectDB from "@/DB/ConnectDB";
import User from "@/models/User";
import Wishlist from "@/models/Wishlist";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  try {
    const { userId, productId } = await req.json();
    if (!userId || !productId) return NextResponse.json({ message: "userId and productId are required" }, { status: 400 });

    await ConnectDB();

    // Add product to wishlist, create wishlist if not exists
    const wishlist = await Wishlist.findOneAndUpdate(
      { user: userId },
      { $addToSet: { products: productId } }, // avoids duplicates
      { new: true, upsert: true } // create if doesn't exist
    );

    // Ensure user's wishlist field is set if this is a new wishlist
    await User.findByIdAndUpdate(userId, { $set: { wishlist: wishlist._id } });

    return NextResponse.json({ message: "Product added to wishlist" }, { status: 200 });
  } catch (error) {
    console.error("Wishlist POST error:", error);
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
};

// REMOVE FROM WISHLIST
export const DELETE = async (req) => {
    const { userId, productId } = await req.json();
    if (!userId || !productId) return NextResponse.json({ message: "userId and productId are required" }, { status: 400 });

    try {
        await ConnectDB();

        const wishlist = await Wishlist.findOneAndUpdate(
            { user: userId },
            { $pull: { products: productId } },
            { new: true }
        );

        if (!wishlist) return NextResponse.json({ message: "Wishlist not found" }, { status: 404 });
        return NextResponse.json({status:"ok", message: "Product removed from wishlist", wishlist });
    } catch (error) {
        console.error("Wishlist DELETE error:", error);
        return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
    }
};
