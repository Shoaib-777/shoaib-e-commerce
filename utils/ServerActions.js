"use server";
import ConnectDB from "@/DB/ConnectDB";
import Order from "@/models/Order";
import Product from "@/models/Product";
import User from "@/models/User";
import Address from "@/models/Address";
import { revalidatePath } from "next/cache";
import Cart from "@/models/Cart";
import { redirect } from "next/navigation";
import Contact from "@/models/Contact";
import bcrypt from "bcrypt";


export const getProductsByCategory = async (category) => {
  try {
    await ConnectDB();

    const query = category && category !== "All" ? { category } : {};
    const products = await Product.find(query).lean();

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};

export const getProductsByCategoryWithNotSimilar = async (product) => {
  try {
    await ConnectDB();

    // Ensure product and category exist
    if (!product || !product.category) {
      return [];
    }

    // Safely encode the category
    const encodedCategory = encodeURIComponent(product.category);

    // Fetch all products in the same category except the current one
    const products = await Product.find({
      category: decodeURIComponent(encodedCategory), // decode before query if stored raw
      _id: { $ne: product._id }, // exclude current product
    }).lean();

    return JSON.parse(JSON.stringify(products));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
};


export const getUserProfile = async (userId) => {
  try {
    await ConnectDB()
    const user = await User.findById(userId).lean()
    if (!user) {
      console.log("user data not found")
      return null
    }
    return user || []
  } catch (error) {
    console.log("error fetching user data")
  }
}

export const getUserOrdersServer = async (userId) => {
  try {
    const data = await Order.find({ user: userId })
      .populate("items.product")
      .populate("shippingAddress");

    const res_data = {
      user: userId,
      orders: data.length > 0 ? data.map(order => ({
        _id: order._id,
        orderId: order.orderId,
        orderedAt: order.orderedAt,
        expectedDelivery: order.expectedDelivery,
        cancelled: order.cancelled,
        cancelledAt: order.cancelledAt,
        status: order.status,
        totalAmount: order.totalAmount,
        items: order.items.map(item => ({
          product: item.product, // populated product details
          quantity: item.quantity,
          price: item.price
        })),
        shippingAddress: order.shippingAddress, // populated address
        createdAt: order.createdAt,
        updatedAt: order.updatedAt
      })) : { orders: [] } // empty orders array if no data
    };

    return res_data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return { user: userId, orders: [] }; // safely return empty orders
  }
};

export async function cancelOrder(formData) {
  const orderId = formData.get('orderId');

  try {
    const order = await Order.findById(orderId);
    order.status = 'cancelled';
    order.cancelled = true;
    order.cancelledAt = new Date().toISOString();
    await order.save();

    console.log("canelled order sucessfully")

    revalidatePath('/profile');
    return;
  } catch (error) {
    console.error('Error cancelling order:', error);
  }
}

export const updateUser = async ({ userId, name, email, phone, profile, profilePublicId }) => {
  try {
    await ConnectDB()
    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { name, email, phone, profile, profilePublicId } },
      { new: true }
    ).select("-password")

    // revalidate the profile page after update
    revalidatePath("/profile")

    return { status: "ok" }
  } catch (error) {
    console.log("error updating user profile")
  }

}


export const sendQuery = async (formData) => {
  const { name, email, phone, message } = Object.fromEntries(formData)

  try {
    await ConnectDB()
    const data = await Contact.create({
      name, email, phone, message
    })
    await data.save()
    console.log("query send sucess")
  } catch (error) {
    console.log("error sending query")
  }
  redirect('/')
}

export const UserSignUp = async (formData) => {
  const { name, email, phone, password, profile, profilePublicId } = formData
  try {
    await ConnectDB()
    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });

    if (existingUser) {
      if (existingUser.email === email) {
        return { status: "error", message: "Email already registered" };
      } else if (existingUser.phone === phone) {
        return { status: "error", message: "Phone number already registered" };
      }
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    const user = await User.create(({
      name, email, phone, password: hashedPassword, profile, profilePublicId
    }))
    await user.save()
    return { status: "ok" }
  } catch (error) {
    console.log("error user signup")
    return { status: "error",message:"Internal Server Error" }
  }
}

export async function findUserByEmail(email) {
  try {
    await ConnectDB();

    const user = await User.findOne({ email });
    return user;
  } catch (error) {
    console.error("Error finding user by email:", error);
    throw new Error("Database error while fetching user");
  }
}

export async function verifyPassword(userPassword, originalPassword) {
  try {
    const isValid = await bcrypt.compare(userPassword, originalPassword);
    return isValid;
  } catch (error) {
    console.error("Error verifying password:", error);
    throw new Error("Password verification failed");
  }
}

export const redirectFromSSR = async (path) => {
  redirect(path)
  revalidatePath(path)
}