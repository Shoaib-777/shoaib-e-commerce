//api/wishlist/route.js
import { auth } from "@/app/auth";
import ConnectDB from "@/app/DB/ConnectDB";
import Users from "@/app/models/Users";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    await ConnectDB();
    const { user } = await auth();
    const { wishlist } = await req.json();

    if (!wishlist || !wishlist.productIdw) {
      return NextResponse.json({ message: "Invalid wishlist data" }, { status: 400 });
    }

    const userdata = await Users.findOne({ username: user.username });

    if (!userdata) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (!userdata.wishlist) {
      userdata.wishlist = [];
    }

    // Check if the product already exists in the wishlist
    const productExists = userdata.wishlist.some(item => item.productIdw === wishlist.productIdw);

    if (productExists) {
      return NextResponse.json({ message: "Product already in wishlist" }, { status: 409 });
    }

    // Add the product to the user's wishlist
    userdata.wishlist.push({
      productIdw: wishlist.productIdw,
      productTitlew: wishlist.productTitlew,
      productDescriptionw: wishlist.productDescriptionw,
      productImagew: wishlist.productImagew,
      productCategoryw: wishlist.productCategoryw,
      productPricew: wishlist.productPricew
    });

    await userdata.save();

    return NextResponse.json({ message: "Product added to wishlist successfully", wishlist: userdata.wishlist });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

export async function GET() {
    try {
        await ConnectDB()
        const {user} = await auth()
        const userdata = await Users.findOne({username:user.username})
        if(!userdata || !userdata.wishlist){
            return NextResponse.json({message:"No Wishlist Products Found IN DB"})
        }
        return NextResponse.json({wishlist:userdata.wishlist})
    } catch (error) {
        return NextResponse.json({ Message: error.message });
    }
}