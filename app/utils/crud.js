'use server'

import { redirect } from "next/navigation";
import ConnectDB from "../DB/ConnectDB";
import Users from "../models/Users";
import bcrypt from 'bcrypt'
import { auth, signIn } from "../auth";
import { toast } from "react-toastify";

export const AddUserf = async (formData, profiles) => {
  const { username, email, phone, password, } = Object.fromEntries(formData);
  try {
    await ConnectDB();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new Users({
      username, email, phone, password: hashedPassword, img: profiles
    })
    await newUser.save()
    console.log("user created succesfully ")
  } catch (err) {
    console.log('failed to create user', err)
    throw new Error("failed to create user")
  }
  redirect('/login')
}
export const CartItemsOnlyProducts = async () => {
  try {
    let { user } = await auth();
    if (!user || !user.username) {
      return "Please Login";  // Return a message if the user is not logged in
    }
    await ConnectDB();
    let usersData = await Users.findOne({ username: user.username });
    console.log("Data found for users to cart and wishlist")
    return usersData.products; // Return the products array
  } catch (error) {
    console.error('Error finding user CartItems:', error);
    throw new Error('Failed to fetch user cart items');
  }
};
// utils/crud.js


//next auth  
export const authenticate = async (prevState, formData) => {
  const { email, password } = Object.fromEntries(formData);

  try {
    await signIn('credentials', { email, password });
    toast.success('Login Successfully');
  } catch (err) {
    if (err.message.includes('CredentialsSignin')) {
      return 'Invalid Email or Password!';
    }
    if (!err.message.includes('CredentialsSignin')) {
      return 'Login Successfully';
    }
    throw err;
  }
}