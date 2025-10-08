import { NextResponse } from "next/server";
import Cart from "@/models/Cart";
import Product from "@/models/Product";
import ConnectDB from "@/DB/ConnectDB";
import mongoose from "mongoose"
import User from "@/models/User";

// see test
//op

// ------------------ POST ------------------
export const POST = async (req) => {
  const { userId, type, productId, productsId } = await req.json();

  if (!userId) 
    return NextResponse.json({ message: "User ID required" }, { status: 400 });

  try {
    await ConnectDB();

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = await Cart.create({ user: userId, items: [] });
      await User.findByIdAndUpdate(userId, { cart: cart._id });
    }


    // SINGLE ADD
    if (type === "single_add") {
      if (!productId) return NextResponse.json({ message: "Product ID required" }, { status: 400 });

      const exists = cart.items.find(i => i.product.toString() === productId);
      if (exists) return NextResponse.json({ message: "Product already in cart" }, { status: 200 });

      const newItem = { product: productId, quantity: 1 };
      cart.items.unshift(newItem);

    } 
    // MULTIPLE ADD
    else if (type === "multiple_add") {
      if (!productsId || !Array.isArray(productsId)) 
        return NextResponse.json({ message: "Products array required" }, { status: 400 });

      for (const pid of productsId) {
        const exists = cart.items.find(i => i.product.toString() === pid);
        if (!exists) {
          const newItem = { product: pid, quantity: 1 };
          cart.items.unshift(newItem);
        }
      }
    } 
    else {
      return NextResponse.json({ message: "Invalid type" }, { status: 400 });
    }

    await cart.save();

    return NextResponse.json({message: "Items added to cart"},{ status: 201 });

  } catch (error) {
    console.error("Cart POST error:", error);
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
};

export const PATCH = async (req) => {
  const { userId, itemId, action } = await req.json();
  if (!userId || !itemId) {
    return NextResponse.json({ message: "userId and itemId is required" }, { status: 400 })
  }
  try {
    await ConnectDB()
    const data = await Cart.findOne({ "user": userId, "items._id": itemId })

    if (!data) {
      return NextResponse.json({ message: "no cart data found" })
    }
    let updateQuery;
    if (action === "increase") {
      updateQuery = { $inc: { "items.$.quantity": 1 } };
    } else if (action === "decrease") {
      updateQuery = { $inc: { "items.$.quantity": -1 } };
    }
    else {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 });
    }

    const cart = await Cart.findOneAndUpdate({ user: userId, "items._id": itemId }, updateQuery, { new: true });

    if (!cart) {
      return NextResponse.json({ message: "Cart or item not found" }, { status: 404 });
    }
    return NextResponse.json({ status: "ok", message: "updated quantity" })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
  }
};

export const PUT = async (req) => {
  try {
    const { userId, itemId, action } = await req.json()
    if (!userId)
      return NextResponse.json({ message: "userId is required" }, { status: 400 })

    await ConnectDB()
    const cart = await Cart.findOne({ user: userId })
    if (!cart)
      return NextResponse.json({ message: "No cart found" }, { status: 404 })

    if (action === "deleteone") {
      if (!itemId) {
        return NextResponse.json({ message: "itemId is required for deleteone" }, { status: 400 });
      }
      cart.items = cart.items.filter(i => i._id.toString() !== itemId)
    } else if (action === "clearcart") {
      cart.items = []
    } else {
      return NextResponse.json({ message: "Invalid action" }, { status: 400 })
    }
    await cart.save()
    return NextResponse.json({ status: "ok", message: "Cart updated successfully", cart })
  } catch (error) {
    return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 })
  }
}





