'use client';
import { FcGoogle } from "react-icons/fc";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useState } from "react";
import Link from "next/link";

const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [profiles, setProfiles] = useState(false);
    const handleSignUpWithGoogle = () => alert("sorry this feature is unavailable currently")

    const handleSubmit = async (e) => {
        e.preventDefault();
    };

    return (
        <div className="background w-full min-h-screen py-3">
            <div className="container mx-auto h-full flex justify-center items-center px-2 sm:px-0">
                <div className="border border-gray-200 bg-transparent rounded-lg px-4 py-6 w-full max-w-md ">
                    <form onSubmit={handleSubmit} className="w-full mb-2">
                        <div className="flex flex-col justify-center items-center gap-y-2 w-full">
                            <div className="w-full">
                                <h2 className="text-center text-white font-bold text-2xl">Sign Up</h2>
                            </div>
                            <div>
                                <h2 className="font-bold text-3xl text-center text-white">Hello User!</h2>
                            </div>
                            <div className="w-full">
                                <label htmlFor="file">
                                    <div className="w-full flex flex-col justify-center items-center">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXZElMNFXv-lQzkLqtLk7l1k090WNrupIZCw&s" alt="no image" className="rounded-full size-12" />
                                    <span className="text-white">Profile Image</span>
                                </div>
                                </label>
                                <input type="file" accept="image/*" className="hidden" id="file" />
                            </div>
                            <div className="w-full">
                                <label htmlFor="username" className="text-white font-bold text-[18px]">Name</label><br />
                                <input type="text" placeholder="Enter User Name" name="username" className="w-full px-4 py-2 bg-white rounded-md" required={true} />
                            </div>
                            <div className="w-full">
                                <label htmlFor="email" className="text-white font-bold text-[18px]">Email</label><br />
                                <input type="email" name="email" placeholder="example123@gmail.com" className="w-full px-4 py-2 bg-white rounded-md" required={true} />
                            </div>
                            <div className="w-full">
                                <label htmlFor="phone" className="text-white font-bold text-[18px]">Phone</label><br />
                                <input type="phone" name="phone" placeholder="9876543210" className="w-full px-4 py-2 bg-white rounded-md" required={true} maxLength={12} />
                            </div>
                            <div className="w-full relative">
                                <label htmlFor="password" className="text-white font-bold text-[18px]">Password</label><br />
                                <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" className="w-full px-4 py-2 bg-white rounded-md" required={true} />
                                {showPassword ?
                                    <LuEyeOff onClick={() => setShowPassword(false)} className="absolute top-8 right-2 text-black w-7 h-7 cursor-pointer" /> :
                                    <LuEye onClick={() => setShowPassword(true)} className="absolute top-8 right-2 text-black w-7 h-7 cursor-pointer" />
                                }
                            </div>
                            <div className="w-full">
                                <button className="w-full text-center py-2 border border-white rounded-md bg-black text-white font-bold">Sign Up</button>
                            </div>
                        </div>
                    </form>
                    <div className="flex flex-col justify-center items-center gap-y-3 w-full">
                        <div className="flex items-center justify-center w-full">
                            <hr className="w-full h-[2px] bg-white" /> <span className="px-4 text-nowrap text-white"> or signup with </span> <hr className="w-full h-[2px] bg-white" />
                        </div>
                        <div className="w-full">
                            <button onClick={handleSignUpWithGoogle} type="button" className="w-full py-2 border border-white rounded-md bg-white text-black font-bold text-[16px] tracking-tighter flex justify-center items-center gap-x-2">
                                <FcGoogle className="size-5 " /> Continue With Google
                            </button>
                        </div>
                        <div className="w-full">
                            <h3 className="text-white font-bold text-[16px] text-center">Already have an account? <Link href={'/login'}><span className="text-purple-700 cursor-pointer hover:underline decoration-[2px]">Login?</span></Link></h3>
                        </div>
                    </div>



                </div>
            </div>

        </div>
    );
};

export default Signup;