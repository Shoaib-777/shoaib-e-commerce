import ConnectDB from "@/DB/ConnectDB"
import Cart from "@/models/Cart"
import Order from "@/models/Order"
import { NextResponse } from "next/server"

// ---------------- POST ----------------
export const POST = async (req) => {
    const { user, orderId, orderedAt, expectedDelivery, items, shippingAddress, status, totalAmount } = await req.json()

    if (!user || !orderId || !orderedAt || !items || !shippingAddress || !totalAmount) {
        return NextResponse.json({ message: "All fields are required: user, orderId, orderedAt, items, shippingAddress, totalAmount" }, { status: 400 })
    }

    try {
        await ConnectDB()
        const newOrder = await Order.create({
            user,
            orderId,
            orderedAt,
            expectedDelivery,
            items,
            shippingAddress,
            status,
            totalAmount
        })
        if (!newOrder) {
            return NextResponse.json({ message: "error creating user order" }, { status: 400 })
        }
        await Cart.findOneAndUpdate(
            { user: user },
            { $set: { items: [] } },
            { new: true }
        )
        return NextResponse.json({ message: "Saved user order successfully", order: newOrder }, { status: 201 })
    } catch (error) {
        console.error("Error saving user order", error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}

// ---------------- PUT ----------------
export const PUT = async (req) => {
    try {
        const body = await req.json()
        const { id } = body

        if (!id) {
            return NextResponse.json({ message: "Order id is required" }, { status: 400 })
        }

        await ConnectDB()

        const allowedFields = [
            "status",
            "cancelled",
            "cancelledAt",
        ]

        const updateFields = {}
        allowedFields.forEach((field) => {
            if (body[field] !== undefined) {
                updateFields[field] = body[field]
            }
        })

        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true, runValidators: true }
        )

        if (!updatedOrder) {
            return NextResponse.json({ message: "Order not found" }, { status: 404 })
        }

        return NextResponse.json({ message: "Order updated successfully", order: updatedOrder }, { status: 200 })
    } catch (error) {
        console.error("Error updating order", error)
        return NextResponse.json({ message: "Internal Server Error", error: error.message }, { status: 500 })
    }
}
