import mongoose, { Schema } from "mongoose";

const ProductSchema = new Schema({
  id: { type: String },
  title: { type: String },
  price: { type: Number },
  description: { type: String },
  category: { type: String },
  image: { type: String },
  rating: {
    rate: { type: Number },
    count: { type: Number },
  },
});

const AllproductsSchema = new Schema({
  products: [ProductSchema], // This will hold an array of products
});

const Allproducts = mongoose.models.Allproducts || mongoose.model("Allproducts", AllproductsSchema);
export default Allproducts;
