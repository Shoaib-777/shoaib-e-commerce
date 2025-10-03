
import ConnectDB from "@/DB/ConnectDB"
import User from "@/models/User"
import { NextResponse } from "next/server"


export const GET = async (req) => {
    return NextResponse.json({ message: "ok" })
}

export async function POST(req) {
    try {
        await ConnectDB();
        const { name, email, phone, password, profile } = await req.json();

        if (!name || !email || !phone || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email or phone already exists" },
                { status: 409 }
            );
        }


        // Create user
        const newUser = await User.create({
            name,
            email,
            phone,
            password,
            profile
        });

        return NextResponse.json(
            {
                message: "User created successfully",
                user: { id: newUser._id, name: newUser.name, email: newUser.email },
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Signup error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

