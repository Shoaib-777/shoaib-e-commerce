import mongoose, { Schema } from "mongoose"

const wishlistSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

// ✅ Reuse if already compiled
const Wishlist = mongoose.models.Wishlist || mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;