
import mongoose, { Schema } from "mongoose";

const productSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String },
    image: { type: String, required: true },
    max_quantity: { type: Number, default: 6 },
    rating: {
      rate: { type: Number },
      count: { type: Number }
    },
  },
  { timestamps: true }
);
const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default Product;