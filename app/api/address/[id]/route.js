import ConnectDB from "@/DB/ConnectDB";
import Address from "@/models/Address";
import { NextResponse } from "next/server";

export const GET = async (req, { params }) => {
    const { id } = await params;
    if (!id) {
        return NextResponse.json({ message: "id is required" }, { status: 400 })
    }
    try {
        await ConnectDB()
        const data = await Address.find({ "user": id })
        if (!data || data.length === 0) {
            return NextResponse.json({ message: "data not found" }, { status: 202 })
        }
        const res_data = { user: id, addresses: data.map(addr => ({ _id: addr._id, fullName: addr.fullName, phone: addr.phone, alt_phone: addr.alt_phone, email: addr.email, address1: addr.address1, address2: addr.address2, city: addr.city, state: addr.state, landmark: addr.landmark, pincode: addr.pincode, country: addr.country, addressType: addr.addressType, createdAt: addr.createdAt, updatedAt: addr.updatedAt })) }

        return NextResponse.json({ data: res_data, message: "ok" }, { status: 200 })
    } catch (error) {
        console.log("error get request of address at server", error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}

export const DELETE = async (req, { params }) => {
    const { id } = await params;
    if (!id) {
        return NextResponse.json({ message: "id is required", status: 400 })
    }
    try {
        await ConnectDB()
        const data = await Address.findByIdAndDelete(id)
        if (!data) {
            return NextResponse.json({ message: "no data found for delete" }, { status: 404 })
        }
        return NextResponse.json({ message: "Deleted Sucessfully !" }, { status: 200 })
    } catch (error) {
        console.log("Error deleting address", error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}