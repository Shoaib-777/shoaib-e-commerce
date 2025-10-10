"use client";
import { SessionProvider } from "next-auth/react";
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Search from "./Search";

const TogetherComp = ({ session }) => {
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Hide on scroll down, show on scroll up
            if (currentScrollY > lastScrollY && currentScrollY > 100) {
                setVisible(false);
            } else {
                setVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <SessionProvider session={session}>
            <div
                className={`sticky top-0 z-50 bg-white transition-transform duration-300 ${visible ? "translate-y-0" : "-translate-y-full"
                    }`}
            >
                <Navbar />
                <Search />
            </div>
        </SessionProvider>
    );
};

export default TogetherComp;
