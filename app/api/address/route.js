import ConnectDB from "@/DB/ConnectDB"
import Address from "@/models/Address"
import { NextResponse } from "next/server"

export const POST = async (req) => {
    const { user, fullName, phone, alt_phone, email, address1, address2, city, state, landmark, pincode, country, addressType } = await req.json()
    if (!user || !fullName || !phone || !address1 || !city || !state || !pincode || !country || !addressType) {
        return NextResponse.json({ message: "All Fielda are required like : fullName, phone,  address1,  city, state,  pincode, country, addressType  " }, { status: 400 })
    }
    try {
        await ConnectDB()
        const data = await Address.create({
            user, fullName, phone, alt_phone, email, address1, address2, city, state, landmark, pincode, country, addressType
        })
        await data.save()
        if (!data) {
            return NextResponse.json({ message: "error saving user address" }, { status: 400 })
        }
        return NextResponse.json({ message: "Saved User Address Sucessfully" }, { status: 201 })
    } catch (error) {
        console.log("error saving user address", error)
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 })
    }
}

export const PUT = async (req) => {
    try {
        const body = await req.json();
        const { id } = body;

        if (!id) {
            return NextResponse.json({ message: "id is required" }, { status: 400 });
        }

        await ConnectDB();

        // whitelist fields based on schema
        const allowedFields = [
            "fullName",
            "phone",
            "alt_phone",
            "email",
            "address1",
            "address2",
            "city",
            "state",
            "landmark",
            "pincode",
            "country",
            "addressType"
        ];

        const updateFields = {};
        allowedFields.forEach((field) => {
            if (body[field] !== undefined) {
                updateFields[field] = body[field];
            }
        });

        const updatedAddress = await Address.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true, runValidators: true }
        );

        if (!updatedAddress) {
            return NextResponse.json({ message: "Address not found" }, { status: 404 });
        }

        return NextResponse.json(updatedAddress, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Internal server error", error: error.message }, { status: 500 });
    }
};