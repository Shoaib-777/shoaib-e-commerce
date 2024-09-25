import mongoose from "mongoose";
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  productId: {
    type: String,
    required: true
  },
  productTitle: {
    type: String,
    required: true
  },
  productDescription: {
    type: String,
    required: true
  },
  productImage: {
    type: String,
    required: true
  },
  productCategory: {
    type: String,
    required: true
  },
  productPrice: {
    type: Number,
    required: true
  },
  productQuantity: {
    type: Number,
    required: true
  }
});

const OrderSchema = new Schema({
  products: [ProductSchema], // Array of products
  orderStatus: {
    type: String,
    required: true,
    default: "pending" // Default value
  },
  userDetail: {
    userName: { type: String },
    userEmail: { type: String },
    phone: { type: String }
  },
  orderId:{
    type:String,
    unique:true ,
    required:true,
    default: () => `ORD-${Date.now()}-${Math.floor(1000 + Math.random() * 9000)}`
  },
  address: { // Add address field
    fullName: { type: String, required: true },
    mobileNo: { type: String, required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    cityVillage: { type: String, required: true },
    pincode: { type: String },
    fulladdress: { type: String, required: true },
    landmark: { type: String },
    location:{
      latitude:{type:String},
      longitude:{type:String}
    },
  }
}, { timestamps: true });

// Correct the model name to match
const Orders = mongoose.models.Order || mongoose.model("Order", OrderSchema);

export default Orders;
