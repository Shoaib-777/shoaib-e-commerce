"use client"
import Link from "next/link";
import { FaHome, FaExclamationTriangle } from "react-icons/fa";
import { MdOutlineTravelExplore } from "react-icons/md";

export default function Custom404() {
    return (
        <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 blur-3xl opacity-60" />

            {/* Icon */}
            <div className="text-primary text-7xl md:text-8xl animate-bounce mb-6 z-10">
                <FaExclamationTriangle />
            </div>

            {/* 404 Heading */}
            <h1 className="text-8xl md:text-9xl font-extrabold text-primary drop-shadow-lg z-10">
                404
            </h1>

            {/* Subheading */}
            <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-base-content z-10">
                Oops! Page Not Found
            </h2>

            {/* Description */}
            <p className="mt-3 text-base text-base-content/70 max-w-md mx-auto z-10">
                The page you&apos;re looking for doesn&apos;t exist or has been moved.
                Let&apos;s get you back on track.
            </p>


            {/* Buttons */}
            <div className="mt-8 flex gap-4 z-10">
                <Link href="/">
                    <button className="btn btn-primary flex items-center gap-2 shadow-md hover:shadow-lg transition-all">
                        <FaHome className="text-lg" /> Home
                    </button>
                </Link>

                <Link href="/">
                    <button className="btn btn-outline btn-secondary flex items-center gap-2 hover:scale-105 transition-all">
                        <MdOutlineTravelExplore className="text-lg" /> Explore
                    </button>
                </Link>
            </div>

            {/* Floating Background Icons */}
            <div className="absolute top-10 left-10 text-primary/20 text-6xl animate-spin-slow">
                <FaExclamationTriangle />
            </div>
            <div className="absolute bottom-10 right-10 text-secondary/20 text-6xl animate-spin-slow-reverse">
                <MdOutlineTravelExplore />
            </div>

            <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-slow-reverse {
          animation: spin-slow 20s linear infinite reverse;
        }
      `}</style>
        </div>
    );
}
