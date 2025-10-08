import ConnectDB from "@/DB/ConnectDB";
import Order from "@/models/Order";
import { NextResponse } from "next/server";
import Product from "@/models/Product";   // required for populate
import Address from "@/models/Address";

export const GET = async (req, { params }) => {
    const { id } = await params;

    if (!id) {
        return NextResponse.json({ message: "id is required" }, { status: 400 });
    }

    try {
        await ConnectDB();
        const data = await Order.find({ user: id })
            .populate("items.product") // optional: to get product details
            .populate("shippingAddress"); // optional: to get full address

        if (!data || data.length === 0) {
            return NextResponse.json({ message: "Orders not found" }, { status: 404 });
        }

        const res_data = {
            user: id,
            orders: data.map(order => ({
                _id: order._id,
                orderId: order.orderId,
                orderedAt: order.orderedAt,
                expectedDelivery: order.expectedDelivery,
                cancelled: order.cancelled,
                cancelledAt: order.cancelledAt,
                status: order.status,
                totalAmount: order.totalAmount,
                items: order.items.map(item => ({
                    product: item.product, // if populated, contains product details
                    quantity: item.quantity,
                    price: item.price
                })),
                shippingAddress: order.shippingAddress, // if populated, contains address details
                createdAt: order.createdAt,
                updatedAt: order.updatedAt
            }))
        };

        return NextResponse.json({ data: res_data, message: "ok" }, { status: 200 });
    } catch (error) {
        console.error("error get request of orders at server", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
};
