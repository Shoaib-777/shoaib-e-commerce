//api/orders/route.js
import ConnectDB from "@/app/DB/ConnectDB";
import { NextResponse } from "next/server";
import { auth } from "@/app/auth"; 
import Orders from "@/app/models/orders";

export async function POST(req) {
  try {
    const body = await req.json();
    await ConnectDB();

    const userDetails = await auth();
    const newOrder = new Orders({
      products: body.products.map(product => ({
        productId: product.productId,
        productTitle: product.productTitle,
        productDescription: product.productDescription,
        productImage: product.productImage,
        productCategory: product.productCategory,
        productPrice: parseFloat(product.productPrice),
        productQuantity: parseInt(product.productQuantity),
      })),
      orderStatus: "pending",
      userDetail: {
        userName: userDetails.user.username,
        userEmail: userDetails.user.email,
        phone: userDetails.user.phone,
      },
      address: body.address, // Add the address here
    });

    await newOrder.save();
    return NextResponse.json({ message: "Order placed successfully" });
  } catch (error) {
    console.error('Error handling POST request:', error);
    return NextResponse.json({ message: "Error placing order", error });
  }
}

export async function GET(req) {
  const {user} = await auth()
  try {
    await ConnectDB()
    const orderDetails = await Orders.find({"userDetail.userName":user.username})
    return NextResponse.json({orders:orderDetails})
  } catch (error) {
    return NextResponse.json({Error:error})
  }
}
