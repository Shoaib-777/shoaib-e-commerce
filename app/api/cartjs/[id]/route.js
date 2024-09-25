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

    if (!userdata || !userdata.products) {
      return NextResponse.json({ Message: "No products found" });
    }

    const { id: productId } = params;

    const product = userdata.products.find(
      (product) => product.productId === productId
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

    if (!userdata || !userdata.products) {
      return NextResponse.json({ Message: "No products found" });
    }

    const { id: productId } = params;

    // Remove the product from the user's product list
    userdata.products = userdata.products.filter(
      (product) => product.productId !== productId
    );

    // Save the updated user data
    await userdata.save();

    return NextResponse.json({ Message: "Product deleted successfully" });
  } catch (error) {
    return NextResponse.json({ Message: error.message });
  }
}