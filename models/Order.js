import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
    {
        orderId:{type:String,required:true},
        orderedAt:{type:String,require:true},
        expectedDelivery:{type:String},
        cancelledAt:{type:String,default:null},
        cancelled:{type:Boolean,default:false},
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        items: [
            {
                product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
                quantity: { type: Number, required: true, default: 1 },
                price: { type: Number, required: true },
            },
        ],
        shippingAddress: { type: Schema.Types.ObjectId, ref: "Address", required: true },
        status: {
            type: String,
            default: "pending",
        },
        totalAmount: { type: Number, required: true },
    },
    { timestamps: true }
);

// ✅ Reuse if already compiled
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
