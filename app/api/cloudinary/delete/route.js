// /api/cloudinary/delete/route.js
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const POST = async (req) => {
  try {
    const { public_id } = await req.json();
    if (!public_id)
      return NextResponse.json({ message: "No public_id provided" }, { status: 400 });

    await cloudinary.uploader.destroy(public_id);
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Cloudinary delete error:", err);
    return NextResponse.json({ error: "Failed to delete image" }, { status: 500 });
  }
};
