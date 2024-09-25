//api/carts/[id]/route.js
import { auth } from "@/app/auth";
import ConnectDB from "@/app/DB/ConnectDB";
import Users from "@/app/models/Users";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    await ConnectDB();
    const { user } = await auth();
    const userdata = await Users.findOne({ username: user.username });

    if (!userdata || !userdata.wishlist) {
      return NextResponse.json({ Message: "No products found" });
    }

    const { id: productIdw } = params;

    const product = userdata.wishlist.find(
      (product) => product.productIdw === productIdw
    );

    if (!product) {
      return NextResponse.json({ Message: "Product not found" });
    }

    return NextResponse.json({ ProductData: product });
  } catch (error) {
    return NextResponse.json({ Message: error.message });
  }
}

export async function DELETE(req, { params }) {
  try {
    await ConnectDB();
    const { user } = await auth();
    const userdata = await Users.findOne({ username: user.username });

    if (!userdata || !userdata.wishlist) {
      return NextResponse.json({ Message: "No products found" });
    }

    const { id: productIdw } = params;

    // Remove the product from the user's product list
    userdata.wishlist = userdata.wishlist.filter(
      (product) => product.productIdw !== productIdw
    );

    // Save the updated user data
    await userdata.save();

    return NextResponse.json({ Message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json({ Message: error.message });
  }
}