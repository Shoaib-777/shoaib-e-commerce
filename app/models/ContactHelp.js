import mongoose from "mongoose";
const { Schema } = mongoose;

const ContactusSchema = new Schema({
    username: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
    message: {
        type: String,
    },
}, { timestamps: true });

const Contactus = mongoose.models.Contactus || mongoose.model('Contactus', ContactusSchema)

export default Contactus