import mongoose from 'mongoose'
const { Schema } = mongoose;

const AddressSchema = new Schema({
    fullName: {type:String},
    mobileNo: {type:String},
    country: {type:String},
    state: {type:String},
    cityVillage: {type:String},
    pincode: {type:Number},
    fulladdress: {type:String},
    altcontactNo: {type:String},
    landmark: {type:String},
    location: {
        latitude: { type: String },
        longitude: { type: String },
      },
    userDetail:{
        userName:{type:String},
        userEmail:{type:String},
        phone:{type:String}
      }
} ,{ timestamps: true })
const Address = mongoose.models.Address || mongoose.model("Address", AddressSchema);
export default Address