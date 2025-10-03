import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
{
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    alt_phone:{type:String},
    email:{type:String},
    address1: { type: String, required: true },
    address2: { type: String},
    city: { type: String, required: true },
    state: { type: String, required: true },
    landmark: { type: String,default:"" },
    pincode: { type: Number, required: true },
    country: { type: String, required: true },
    addressType:{type:String,required:true}
  },
  { timestamps: true }

);

// ✅ Reuse if already compiled
const Address = mongoose.models.Address || mongoose.model("Address", addressSchema);

export default Address;