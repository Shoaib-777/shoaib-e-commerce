'use server'

import { redirect } from "next/navigation";
import ConnectDB from "../DB/ConnectDB";
import Contactus from "../models/ContactHelp";
import Address from "../models/Address";


export const ContactHelpQuery = async (formData) => {
    const { username, email,phone, message,} = Object.fromEntries(formData);
    try {
        await ConnectDB();
        const newContactus = new Contactus({
            username, email, phone, message,
        })
        await newContactus.save()
        // console.log("user require help from contact us page ")
    } catch (err) {
        console.log('failed to create user', err)
        throw new Error("failed to create user")
    }
    redirect('/')
}