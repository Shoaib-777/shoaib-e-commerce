//app/signup/page.js
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { CldUploadButton } from 'next-cloudinary';
import { FcGoogle } from 'react-icons/fc';
import { LuEye, LuEyeOff } from 'react-icons/lu';
import { FaCamera } from 'react-icons/fa';
import { redirectFromSSR, UserSignUp } from '@/utils/ServerActions';
import { toast, ToastContainer } from 'react-toastify';


const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [imageUrl, setImageUrl] = useState(null);
    const [profilePublicId, setProfilePublicId] = useState('');

    const handleUpload = (result) => {
        setImageUrl(result.info.secure_url);
        setProfilePublicId(result.info.public_id);
    };

    const signUp = async (data) => {
        try {

        } catch (error) {
            toast.error("Something Went Wrong");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = {
            name: e.target.name.value,
            email: e.target.email.value,
            phone: e.target.phone.value,
            password: e.target.password.value,
            profileImage: imageUrl,
            profilePublicId: profilePublicId,
        };
        console.log('Signup Data:', data);
        const loadingToast = toast.loading("Loading Please Wait...");
        const res = await UserSignUp(data);
        toast.dismiss(loadingToast);
        if (res.status === "ok") {
            toast.success("Sign Up Success!");
            setTimeout(() => {
                redirectFromSSR("/login");
            }, 3000);
        } else {
            toast.error(res.message || "Signup failed");
        }
    };

    return (
        <>
            <ToastContainer theme='dark' autoClose={2000} />
            <div className="background w-full min-h-screen py-3">
                <div className="container mx-auto h-full flex justify-center items-center px-2 sm:px-0">
                    <div className="border border-gray-200 bg-transparent rounded-lg px-4 py-6 w-full max-w-md">
                        <form onSubmit={handleSubmit} className="w-full mb-2">
                            <div className="flex flex-col justify-center items-center gap-y-2 w-full">
                                <h2 className="text-center text-white font-bold text-2xl">Sign Up</h2>
                                <h2 className="font-bold text-3xl text-center text-white">Hello User!</h2>

                                {/* Cloudinary Upload */}
                                <div className="w-full flex flex-col justify-center items-center gap-y-2">
                                    <CldUploadButton
                                        uploadPreset="e_commerce_profiles" // your e_commerce_profiles  preset name
                                        onUpload={handleUpload}
                                        className='flex flex-col justify-center items-center'
                                    >
                                        <div className="text-center">
                                            <div className="relative inline-block">
                                                <img
                                                    src={imageUrl || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXZElMNFXv-lQzkLqtLk7l1k090WNrupIZCw&s'}
                                                    alt="Profile"
                                                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-gray-200 mx-auto"
                                                />
                                                <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                                                    <FaCamera className="w-3 h-3 sm:w-4 sm:h-4 cursor-pointer" />
                                                </button>
                                            </div>
                                        </div>
                                        <span className='text-sky-400 font-bold text-lg cursor-pointer'>Upload Image</span>
                                    </CldUploadButton>
                                </div>

                                {/* Input Fields */}
                                <div className="w-full">
                                    <label className="text-white font-bold text-[18px]">Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Enter User Name"
                                        className="w-full px-4 py-2 bg-white rounded-md"
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="text-white font-bold text-[18px]">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="example123@gmail.com"
                                        className="w-full px-4 py-2 bg-white rounded-md"
                                        required
                                    />
                                </div>
                                <div className="w-full">
                                    <label className="text-white font-bold text-[18px]">Phone</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="9876543210"
                                        className="w-full px-4 py-2 bg-white rounded-md"
                                        required
                                        maxLength={12}
                                    />
                                </div>
                                <div className="w-full relative">
                                    <label className="text-white font-bold text-[18px]">Password</label>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        name="password"
                                        placeholder="Password"
                                        className="w-full px-4 py-2 bg-white rounded-md"
                                        required
                                        minLength={6}

                                    />
                                    {showPassword ? (
                                        <LuEyeOff
                                            onClick={() => setShowPassword(false)}
                                            className="absolute top-8 right-2 text-black w-7 h-7 cursor-pointer"
                                        />
                                    ) : (
                                        <LuEye
                                            onClick={() => setShowPassword(true)}
                                            className="absolute top-8 right-2 text-black w-7 h-7 cursor-pointer"
                                        />
                                    )}
                                </div>
                                <button className="w-full text-center py-2 border border-white rounded-md bg-black text-white font-bold">
                                    Sign Up
                                </button>
                            </div>
                        </form>

                        {/* Google & Login Section */}
                        <div className="flex flex-col justify-center items-center gap-y-3 w-full">
                            <div className="flex items-center justify-center w-full">
                                <hr className="w-full h-[2px] bg-white" />{' '}
                                <span className="px-4 text-nowrap text-white"> or signup with </span>{' '}
                                <hr className="w-full h-[2px] bg-white" />
                            </div>
                            <div className="w-full">
                                <button
                                    onClick={() => alert('Sorry, Google signup not available yet')}
                                    type="button"
                                    className="w-full py-2 border border-white rounded-md bg-white text-black font-bold text-[16px] tracking-tighter flex justify-center items-center gap-x-2"
                                >
                                    <FcGoogle className="size-5 " /> Continue With Google
                                </button>
                            </div>
                            <h3 className="text-white font-bold text-[16px] text-center">
                                Already have an account?{' '}
                                <Link href={'/login'}>
                                    <span className="text-purple-700 cursor-pointer hover:underline decoration-[2px]">
                                        Login?
                                    </span>
                                </Link>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>
        </>);
};

export default Signup;
