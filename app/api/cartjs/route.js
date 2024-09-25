// api/cartjs/route.js
import { auth } from "@/app/auth";
import ConnectDB from "@/app/DB/ConnectDB";
import Users from "@/app/models/Users";
import { NextResponse } from "next/server";


export async function GET() {
  try {
    await ConnectDB()
    const {user} = await auth()
    const userdata = await Users.findOne({username:user.username})
        if(!userdata || !userdata.products){
            return NextResponse.json({message:"No Wishlist Products Found IN DB"})
        }
        return NextResponse.json({products:userdata.products})
      } catch (error) {
        return NextResponse.json({ Message: error.message });
    }
}
export async function PUT(req) {
  try {
    await ConnectDB();
    const { user } = await auth();
    const { productId, productQuantity } = await req.json();
    
    if (!productId || !productQuantity) {
      return NextResponse.json({ message: "Invalid product data" }, { status: 400 });
    }

    const userdata = await Users.findOne({ username: user.username });

    if (!userdata) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const product = userdata.products.find(item => item.productId === productId);

    if (!product) {
      return NextResponse.json({ message: "Product not found in cart" }, { status: 404 });
    }
    
    // Update the product quantity
    product.productQuantity = productQuantity;
    
    await userdata.save();

    return NextResponse.json({ message: "Product quantity updated successfully", products: userdata.products });
  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
export async function POST(req) {
  try {
    await ConnectDB();
    const { user } = await auth(); // Ensure user is authenticated
    const body = await req.json();

    const { product, productId, productTitle, productPrice, productImage, productCategory, productDescription, productQuantity, products } = body;

    // Find user in the database
    const userdata = await Users.findOne({ username: user.username });
    if (!userdata) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // If products array is received empty, clear the cart
    if (products && products.length === 0) {
      userdata.products = []; // Clear the cart
      await userdata.save();
      return NextResponse.json({ message: "Cart cleared successfully", products: userdata.products });
    }

    // Check if it's the first operation (using 'product' field)
    if (product && product.productId) {
      // First operation logic
      const productExists = userdata.products.some(item => item.productId === product.productId);

      if (productExists) {
        return NextResponse.json({ message: "Product already in cart", products: userdata.products }, { status: 409 });
      }

      userdata.products.push({
        productId: product.productId,
        productTitle: product.productTitle,
        productDescription: product.productDescription,
        productImage: product.productImage,
        productCategory: product.productCategory,
        productPrice: product.productPrice,
        productQuantity: product.productQuantity,
      });

      await userdata.save();

      return NextResponse.json({ message: "Product added to cart successfully", products: userdata.products });
    }

    // Second operation logic (using 'productId' and other product details)
    if (productId && productTitle) {
      const productExists = userdata.products.some(product => product.productId === productId);

      if (productExists) {
        return NextResponse.json({ message: "Product already added to cart", products: userdata.products }, { status: 400 });
      }

      userdata.products.push({
        productId,
        productTitle,
        productPrice,
        productImage,
        productCategory,
        productDescription,
        productQuantity,
      });

      await userdata.save(); // Save to the database

      return NextResponse.json({ message: "Product added successfully", products: userdata.products });
    }

    // If none of the conditions match, return an error
    return NextResponse.json({ message: "Invalid request data" }, { status: 400 });

  } catch (error) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

