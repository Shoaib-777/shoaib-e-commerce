'use client'
import Image from "next/image";
import { ToastContainer } from "react-toastify";
import { RiDeleteBin6Fill } from "react-icons/ri";
import axios from "axios";



const AddressCard = ({ handleClick, addressDetails, fetchDetails, loading }) => {
  const DeleteAddress = async (v) => {
    try {
      await axios.delete(`https://shoaib-e-commerce.vercel.app/api/address/${v._id}`);
      alert("Address Deleted Successfully!");
      fetchDetails(); // Re-fetch address details after deletion
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  if (loading)
    return (
      <div className='flex justify-center items-center mx-auto w-full'>
        <Image width={600} height={315} src='/images/lg.gif' alt="loading" className='' />
      </div>
    );

  return (
    <>
      <ToastContainer />
      
      {addressDetails.map((v,i) => (
        <div key={v._id} className="w-[90%] min-h-[376px] md:min-h-[400px] lg:min-h-[376px] max-h-[401px] relative md:w-[40%] mx-auto bg-white shadow-2xl rounded-lg overflow-hidden my-8">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 text-white text-center">
            <h2 className="text-2xl font-bold">Delivery Address</h2>
          </div>
          <div className="p-6">
            <p className="text-gray-800 text-lg">
              <span className="font-semibold">Country:</span> <span>{v.country}</span>
            </p>
            <p className="text-gray-800 text-lg">
              <span className="font-semibold">State:</span> <span>{v.state}</span>
            </p>
            <p className="text-gray-800 text-lg">
              <span className="font-semibold">City/Village:</span> <span>{v.cityVillage}</span>
            </p>
            {v.pincode && (
              <p className="text-gray-800 text-lg">
                <span className="font-semibold">Pincode:</span> <span>{v.pincode}</span>
              </p>
            )}
            <p className="text-gray-800 text-lg">
              <span className="font-semibold">Full Address:</span> <span className="tracking-tighter sm:tracking-normal">{v.fulladdress}</span>
            </p>
            {v.landmark && (
              <p className="text-gray-800 text-lg">
                <span className="font-semibold">Landmark:</span> <span className="">{v.landmark}</span>
              </p>
            )}
          </div>
          <div className="p-6 bg-gray-50 text-center absolute w-full bottom-0 flex items-center">
            <button
              className="w-[90%] bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg shadow-md"
              onClick={() => handleClick(v)}
              >
              Select this address and order
            </button>
            <button className="text-red-600 w-[8%] ml-2" onClick={() => DeleteAddress(v)}>
              <RiDeleteBin6Fill className="text-4xl" />
            </button>
          </div>
        </div>
      ))}
    </>
  );
};

export default AddressCard;