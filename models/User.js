import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true, minlength: 6 },
    profile: { type: String, default: "" },
    cart: { type: Schema.Types.ObjectId, ref: "Cart" },
    wishlist: { type: Schema.Types.ObjectId, ref: "Wishlist" },
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
