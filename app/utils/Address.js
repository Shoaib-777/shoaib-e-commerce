'use server';

import { auth } from "../auth"
import ConnectDB from "../DB/ConnectDB"
import Address from "../models/Address"

export const AddressUserf = async (formData) => {
    const { fullName, mobileNo, country, state, cityVillage, pincode, fulladdress, altcontactNo,landmark,latitude,longitude } = Object.fromEntries(formData)
    const {user} = await auth()
    try {
        await ConnectDB()
        
        const newAddressUser = new Address({
            fullName, mobileNo, country, state, cityVillage, pincode, fulladdress, altcontactNo,landmark,location: {
                latitude,
                longitude,
              },userDetail:{
                userName:user.username,userEmail:user.email
              }
        })

        await newAddressUser.save()
        console.log("user address saved")        
    } catch (error) {
        console.error("Error saving address:", error)
        throw new Error("Failed to save address.")
    }
}
