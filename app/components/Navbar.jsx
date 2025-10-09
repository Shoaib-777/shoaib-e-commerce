"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BiUser } from "react-icons/bi";
import { BsCart } from "react-icons/bs";
import { FaRegHeart, FaSearch } from "react-icons/fa";
import { IoMenu, IoCloseSharp } from "react-icons/io5";
import { useSession, signOut } from "next-auth/react";


const Navbar = () => {

    const pathName = usePathname()
    const [menu, setMenu] = useState(false)
    const { data: session, status } = useSession();
    const [authUser, setAuthUser] = useState(false)

    useEffect(() => {
        if (status === "authenticated") {
            setAuthUser(true);
        } else {
            setAuthUser(false);
        }
    }, [status]);

    return (
        <>
            <div className="border border-gray-200 w-full h-[60px] px-4 py-2 mb-3 relative  ">
                <nav className="flex justify-between">
                    <div className="flex px-4">
                        <Link href={'/'}><svg width="180" height="40" viewBox="-18 1 155 20" stroke='1' xmlns="http://www.w3.org/2000/svg" className='border border-gray-300 rounded-lg shadow-sm' >
                            <defs>
                                <linearGradient id="text-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#38bdf8" />
                                    <stop offset="40%" stopColor="#818cf8" />
                                    <stop offset="65%" stopColor="#34d399" />
                                    <stop offset="100%" stopColor="#a78bfa" />
                                </linearGradient>
                            </defs>
                            <path fill="#00BCFF" d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49A1.003 1.003 0 0 0 20 4H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
                            <text
                                x="30"
                                y="13"
                                fontFamily="inter, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial"
                                fontWeight="600"
                                fontSize="22"
                                fill="url(#text-gradient)"
                                textAnchor="start"
                                dominantBaseline="middle"
                            >
                                FlashCart
                            </text>
                        </svg></Link>
                    </div>
                    <div className="hidden md:flex items-center justify-center">
                        <div>
                            <ul className=" flex justify-center items-center gap-6 text-xl font-semibold ">
                                <Link href={'/'}><li className={`px-4 py-1 relative hovers-link cursor-pointer ${pathName === '/' ? 'text-[#ff8f9c]' : 'text-black'}`}>Home</li></Link>
                                <Link href={'/about'}><li className={`px-4 py-1  relative hovers-link  cursor-pointer ${pathName === '/about' ? 'text-[#ff8f9c]' : 'text-black'}`}>About Us</li></Link>
                                <Link href={'/contact'}><li className={`px-4 py-1  relative hovers-link  cursor-pointer  ${pathName === '/contact' ? 'text-[#ff8f9c]' : 'text-black'}`}>Contact Us</li></Link>
                            </ul>
                        </div>
                        <div>
                            {authUser ? (
                                <button
                                    onClick={() => signOut()}
                                    className="px-4 py-2 bg-red-500 text-white font-medium rounded-xl shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 transition"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link href={'/login'}><button className="text-xl border-[2px] border-black text-white px-4 py-1 font-bold rounded-xl bg-black hover:bg-white hover:text-black  ">Login</button></Link>
                            )}
                        </div>
                    </div >
                    <div className='flex items-center justify-center  md:hidden'>
                        {menu ? (
                            <IoCloseSharp className='w-10 h-10 cursor-pointer'
                                onClick={() => setMenu(!menu)}
                            />
                        ) : (
                            <IoMenu className='w-10 h-10 cursor-pointer'
                                onClick={() => setMenu(!menu)}
                            />
                        )}
                    </div>
                </nav >
            </div >
            <div className={`${menu ? 'block' : 'hidden'}  w-full h-screen bg-slate-50  z-10 px-4 pt-[6rem]`}>
                <div className='px-4 py-2 '>
                    <ul className='flex flex-col justify-center items-center gap-6 font-semibold'>
                        <Link href={'/'}><li
                            onClick={() => setMenu(false)} className={`px-4 py-1 font-bold text-3xl  relative hovers-link ${pathName === '/' ? 'text-[#ff8f9c]' : 'text-black'}`}>Home</li></Link>
                        <Link href={'/about'}><li
                            onClick={() => setMenu(false)} className={`px-4 py-1 font-bold text-3xl  relative hovers-link ${pathName === '/about' ? 'text-[#ff8f9c]' : 'text-black'}`}>About Us</li></Link>
                        <Link href={'/contact'}><li
                            onClick={() => setMenu(false)} className={`px-4 py-1 font-bold text-3xl  relative hovers-link ${pathName === '/contact' ? 'text-[#ff8f9c]' : 'text-black'}`}>Contact Us</li></Link>
                        {authUser ? (
                            <li>
                                <button
                                    onClick={() => signOut()}
                                    className="px-4 py-2 bg-red-500 text-white font-medium rounded-xl shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-1 transition"
                                >
                                    Logout
                                </button></li>
                        ) : (
                            <Link href={'/login'}><li>
                                <button className="text-xl border-[2px] border-black text-white px-4 py-1 font-bold rounded-xl bg-black hover:bg-white hover:text-black  ">Login</button>
                            </li></Link>
                        )}
                    </ul>
                </div>
            </div>

        </>
    );
};

export default Navbar
