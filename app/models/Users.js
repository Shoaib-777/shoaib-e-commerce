import mongoose from "mongoose";
const { Schema } = mongoose;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    phone: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
    },
    products: [
        {
            productId: String,
            productTitle: String,
            productDescription: String,
            productImage: String,
            productCategory: String,
            productPrice: String,
            productQuantity: String,
        }
    ],
    wishlist: [
        {
            productIdw: String,
            productTitlew: String,
            productDescriptionw: String,
            productImagew: String,
            productCategoryw: String,
            productPricew: String,
        }
    ],
}, { timestamps: true });



const Users = mongoose.models.Users || mongoose.model('Users', UserSchema);

export default Users;
