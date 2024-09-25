import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./component/Navbar";
import Footer from "./component/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E-Commerce Web",
  description: "Develop By Shoaib Bhai",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
          <ToastContainer theme="colored"/>
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
