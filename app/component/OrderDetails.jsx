'use client'

import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const OrderDetails = () => {
    const [orderData, setOrderData] = useState([]);
    const [loading,setLoading]= useState(true)

    const fetchOrder = async () => {
        const res = await axios.get("https://shoaib-e-commerce.vercel.app/api/orders");
        setOrderData(res.data.orders || []);
        setLoading(false)
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    // Function to format the date
    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'short', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };
    const DeleteOrder = async (v) => {
        try {
          await axios.delete(`https://shoaib-e-commerce.vercel.app/api/orders/${v._id}`);
          toast.success("Order Deleted Successfully!");
          fetchOrder(); // Re-fetch orders  after deletion
        } catch (error) {
          console.error("Error deleting Order:", error);
        }
      };

    if(loading)
    return(
<>
<div className="w-full flex justify-center items-center">
    <Image src={'/images/loadingGif.gif'} alt="Loading..." width={60} height={60}/>
</div>
</>
)
    return (
        <>
        <ToastContainer theme="colored"/>
            {orderData.length > 0 ? (
                orderData.map((v) => (
                    <li key={v._id} className="mb-4">
                        <div className="flex justify-between">
                            <span>Order #{v.orderId}</span>
                            <span className="text-gray-500">{formatDate(v.createdAt)}</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="text-gray-600">Status: {v.orderStatus}</p> 
                            <button
                            onClick={()=>DeleteOrder(v)}
                            className="bg-red-500 font-semibold text-white px-4 py-1 hover:bg-red-700">Delete Order</button>  
                        </div>
                    </li>
                ))
            ) : (
                <div className="flex flex-col justify-center items-center">
                    <Image src={'/images/empty order.webp'} alt="No Order Yet Now" width={300} height={400}/>
                    <p className="text-gray-600 font-bold text-xl ">No orders yet</p>
                </div>
            )}
        </>
    );
};

export default OrderDetails;