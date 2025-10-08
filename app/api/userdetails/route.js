import ConnectDB from "@/DB/ConnectDB"
import User from "@/models/User"
import { revalidatePath } from "next/cache"
import { NextResponse } from "next/server"

export const PUT = async (req) => {
  try {
    await ConnectDB()
    const { userId, name, email, phone, profile, profilePublicId } = await req.json()

    if (!userId) return NextResponse.json({ success:false, message:"User ID required" }, { status:400 })

    const user = await User.findByIdAndUpdate(
      userId,
      { $set: { name, email, phone, profile, profilePublicId } },
      { new:true }
    ).select("-password")
    revalidatePath('/profile')

    if (!user) return NextResponse.json({ success:false, message:"User not found" }, { status:404 })

    return NextResponse.json({ success:true, message:"User updated", user })
  } catch (err) {
    console.log("Error:", err)
    return NextResponse.json({ success:false, message:"Failed to update user" }, { status:500 })
  }
}
