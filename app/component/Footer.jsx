import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="py-24 px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 bg-gray-100 text-sm mt-20">
      {/* TOP */}
      <div className="flex flex-col md:flex-row justify-between gap-24">
        {/* LEFT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <Link href="/">
            <div className="text-2xl tracking-wide">Brand Name</div>
          </Link>
          <p>
            3255 Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, rerum!
          </p>
          <span className="font-semibold">shaikmohammedshoaib777@gmail.com</span>
          <span className="font-semibold">+91 12345 67890</span>
          <div className="flex gap-6">
            <Image src="/images/facebook.png" alt="no image found" width={16} height={16} />
            <Image src="/images/instagram.png" alt="no image found" width={16} height={16} />
            <Image src="/images/youtube.png" alt="no image found" width={16} height={16} />
            <Image src="/images/pinterest.png" alt="no image found" width={16} height={16} />
            <Image src="/images/x.png" alt="no image found" width={16} height={16} />
          </div>
        </div>
        {/* CENTER */}
        <div className="hidden lg:flex justify-between w-1/2">
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">COMPANY</h1>
            <div className="flex flex-col gap-6">
              <Link href="/about">About Us</Link>
              <Link href="/contact">Careers</Link>
              <Link href="#">Affiliates</Link>
              <Link href="#">Blog</Link>
              <Link href="/contact">Contact Us</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">SHOP</h1>
            <div className="flex flex-col gap-6">
              <Link href="/">New Arrivals</Link>
              <Link href="#">Accessories</Link>
              <Link href="/category/men's clothing">Men</Link>
              <Link href="/category/women's clothing">Women</Link>
              <Link href="/">All Products</Link>
            </div>
          </div>
          <div className="flex flex-col justify-between">
            <h1 className="font-medium text-lg">HELP</h1>
            <div className="flex flex-col gap-6">
              <Link href="/contact">Customer Service</Link>
              <Link href="/profile">My Account</Link>
              <Link href="#">Find a Store</Link>
              <Link href="#">Legal & Privacy</Link>
              <Link href="#">Gift Card</Link>
            </div>
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
          <h1 className="font-medium text-lg">SUBSCRIBE</h1>
          <p>
            Be the first to get the latest news about trends, promotions, and
            much more!
          </p>
          <div className="flex">
            <input
              type="text"
              placeholder="Email address"
              className="p-4 w-3/4"
            />
            <button className="w-1/4 bg-lama text-white bg-red-500">JOIN</button>
          </div>
          <span className="font-semibold">Secure Payments</span>
          <div className="flex justify-between">
            <Image src="/images/discover.png" alt="no image found" width={40} height={20} />
            <Image src="/images/visa.png" alt="no image found" width={40} height={20} />
            <Image src="/images/paypal.png" alt="no image found" width={40} height={20} />
            <Image src="/images/mastercard.png" alt="no image found" width={40} height={20} />
            <Image src="/images/visa.png" alt="no image found" width={40} height={20} />
          </div>
        </div>
      </div>
      {/* BOTTOM */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
        <div className="">© 2024 Company Name</div>
        <div className="flex flex-col gap-8 md:flex-row">
          <div className="">
            <span className="text-gray-500 mr-4">Language</span>
            <span className="font-medium"> English | Hindi | Urdu</span>
          </div>
          <div className="">
            <span className="text-gray-500 mr-4">Currency</span>
            <span className="font-medium">$ USD</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;