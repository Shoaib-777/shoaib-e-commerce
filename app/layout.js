//app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "./components/Footer";
import TogetherComp from "./components/TogetherComp";
import NextTopLoader from "nextjs-toploader";
import { GoogleAnalytics } from '@next/third-parties/google'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shoaib | FlashCart",
  description: "Developed By Shoaib. A Full Stack Developer",
};

export default function RootLayout({ children, session }) {
  return (
    <html lang="en">
      <head>
        <meta name="google-site-verification" content="gHZeD3TFTaekeOyuvRS4_vRxhsUyNMMT1j-zVuaAan4" />
         <GoogleAnalytics gaId="G-M2B04QY69R" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <NextTopLoader
          color="linear-gradient(to right, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))"
        />
        <TogetherComp session={session} />
        {children}
        <Footer />
      </body>
    </html>
  );
}
