//app/login/page.js
"use client";
import React, { useState } from 'react'
import { LuEye, LuEyeOff } from "react-icons/lu";
import { FcGoogle } from "react-icons/fc";
import Link from 'next/link';
import { signIn } from "next-auth/react";
import { redirectFromSSR } from '@/utils/ServerActions';
import { toast, ToastContainer } from 'react-toastify';



const Login = () => {
    const handleLoginWithGoogle = () => alert("sorry this function is currently un-available")
    const [showPassword, setShowPassword] = useState(false)
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Show a loading toast
        const loadingToast = toast.loading("Loading Please Wait...");

        // Wait 2 seconds (simulate promise or delay)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Dismiss the loading toast
        toast.dismiss(loadingToast);
        const email = e.target.email.value;
        const password = e.target.password.value;

        const res = await signIn("credentials", { redirect: false, email, password });

        if (res.error) {
            toast.error("Incorrect Email Or Password")
        } else {
            toast.success("Login Success, Please Wait Redirecting...")
            setTimeout(() => {
                redirectFromSSR("/profile")
            }, 3000);
        }

    }
    return (
        <>
            <ToastContainer theme='dark' autoClose={2000} />
            <div className='w-full h-screen background'>
                <div className='container mx-auto flex justify-center items-center w-full h-full px-2 sm:px-0 '>
                    <div className='border border-gray-200 bg-transparent rounded-lg px-4 py-6 w-full max-w-md'>
                        <form onSubmit={handleSubmit} className='flex flex-col gap-y-4'>
                            <div className=" ">
                                <h2 className="text-center text-white font-bold text-2xl">Login</h2>
                            </div>
                            <div>
                                <h2 className="font-bold text-3xl text-center text-white ">Welcome Back !</h2>
                            </div>
                            <div className="">
                                <label htmlFor="" className="text-white font-bold text-[18px]">Email</label><br />
                                <input type="text" placeholder="example123@gmail.com" name="email" className="w-full px-4 py-2 bg-white rounded-md " required={true} />
                            </div>
                            <div className=" relative">
                                <label className="text-white font-bold text-[18px]" >Password</label><br />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    minLength={6}
                                    placeholder="Password" name="password" className="w-full px-4 py-2  bg-white rounded-md" required={true} />
                                {showPassword ? (
                                    <LuEyeOff onClick={() => setShowPassword(false)} className="absolute top-8 right-2 text-black w-7 h-7  cursor-pointer " />
                                ) : (
                                    <LuEye
                                        onClick={() => setShowPassword(true)}
                                        className="absolute top-8 right-2 text-black w-7 h-7  cursor-pointer" />
                                )}
                            </div>
                            <div className="mb-2">
                                <button type='submit' className="w-full text-center py-2 border border-white rounded-md bg-black text-white font-bold  ">Login</button>
                            </div>
                        </form>
                        <div className='flex flex-col justify-center items-center gap-y-3'>
                            <div className="flex items-center justify-center w-full mb-2 mt-2 ">
                                <hr className='bg-white h-[2px] w-full' /> <span className='text-nowrap text-white px-4'> or login with </span> <hr className='bg-white h-[2px] w-full' />
                            </div>
                            <div className="w-full">
                                <button
                                    onClick={handleLoginWithGoogle}
                                    className="w-full py-2  border border-white rounded-md bg-white text-black font-bold text-[16px] tracking-tighter flex justify-center items-center gap-x-1 ">
                                    <FcGoogle className="size-5" />  Continue With Google
                                </button>

                            </div>
                            <div className="">
                                <h3 className="text-white font-bold text-[16px] text-center ">Don&apos;t have account <Link href={'/signup'}><span className="text-purple-700 cursor-pointer hover:underline decoration-[2px] "> Signup?</span></Link> </h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>)
}

export default Login