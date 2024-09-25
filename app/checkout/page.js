'use client'

import { useState,useEffect } from "react";
import { AddressUserf } from "../utils/Address";
import axios from "axios";
import AddressCard from "../component/AddressCard";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";


const LeafletMap = dynamic(() => import('../component/LeafletMap'), { ssr: false });



const Checkout = () => {
    const Router = useRouter();
    const [locationN, setLocationN] = useState({
      latitude: "",
      longitude: "",
    });
    const [showAddress, setShowAddress] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [addressDetails, setAddressDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showNewAddressButton,setShowNewAddressButton]=useState(true)
    const [placeholdervalue,setPlaceHolderValue]=useState([])
    const [FormattedAddress,setFormattedAddress]=useState('')

    
    useEffect(() => {
      if (typeof window !== 'undefined') {
        // Your logic involving window object
      }
    }, []);
    
  const getCountryStateCity = async (lat, lng) => {
      try {
        const res = await axios.get(
          `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=88e1f514a7cc43d1b6634a5d75b3306f`
        );
        
        const details = res.data.results[0].components;
        const formattedAddress = res.data.results[0].formatted;
        
        setPlaceHolderValue(details);
        setFormattedAddress(formattedAddress )
       // Correct access for formatted address
      } catch (error) {
        console.error("Error fetching location details:", error);
      }
    };
    

  
    const handleTrueFalse = () => {
      setShowForm(true);
      setShowAddress(false);
    };
  
    const fetchDetails = async () => {
      try {
        const res = await axios.get("https://shoaib-e-commerce.vercel.app/api/address");
        if(res.data.userAddress.length === 0 ){
          setShowForm(true)
          setShowNewAddressButton(false)
        }else{
          setShowForm(false)
          setShowNewAddressButton(true)
        }
        setAddressDetails(res.data.userAddress );
        setLoading(false);
      } catch (error) {
        console.error("Error fetching address details: ", error);
      }
    };
  
    const handleClick = async (selectedAddress) => {
      try {
        // console.log("selected Address",selectedAddress)
        const cartResponse = await axios.get("https://shoaib-e-commerce.vercel.app/api/cartjs");
  
        if (!cartResponse.data.products || cartResponse.data.products.length === 0) {
          alert("Your cart is empty.");
          return;
        }
  
        await axios.post("https://shoaib-e-commerce.vercel.app/api/orders", {
          products: cartResponse.data.products,
          address: selectedAddress,
        });
  
        await axios.post("https://shoaib-e-commerce.vercel.app/api/cartjs", { products: [] });
        toast.success("Order Placed Successfully!");
        SetOrder(false)
        Router.push('/profile');
      } catch (error) {
        console.error("Error in handling order: ", error);
      }
    };
  
   
    const handleSubmit = async (event) => {
      event.preventDefault();
    
      const formData = new FormData(event.target);
    
      // Check if location is already available
      if (!locationN.latitude || !locationN.longitude) {
        if (navigator.geolocation) {
          // Get the user's location
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setLocationN({
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
              });
    
              // Append the location to the form data
              formData.append("latitude", position.coords.latitude);
              formData.append("longitude", position.coords.longitude);
    
              // Submit the form only after appending the location
              submitForm(formData);
            },
            (error) => {
              console.error("Error getting location: ", error);
            }
          );
        } else {
          console.error("Geolocation is not supported by this browser.");
        }
      } else {
        // If location is already available, append it to the form data
        formData.append("latitude", locationN.latitude);
        formData.append("longitude", locationN.longitude);
        
        // Submit the form
        submitForm(formData);
      }
    };
    
    // Function to handle form submission
    const submitForm = async (formData) => {
      try {
        await AddressUserf(formData);
        alert("Address Created Successfully!");
        setShowForm(false);
        setShowAddress(true);
        fetchDetails();
      } catch (error) {
        console.error("Address Not Created: ", error);
      }
    };
    
    
    
    useEffect(() => {
      fetchDetails();
    }, []);
  return (
    <>
      <div className="mx-auto w-full flex flex-wrap">
        <div className={`${showAddress ? 'flex':'hidden'} mx-auto w-full  flex-wrap`}>

            <AddressCard
            handleClick={handleClick}
            addressDetails={addressDetails}
            fetchDetails={fetchDetails} 
            loading={loading}
            />
            <div className={`${showNewAddressButton ? 'block':'hidden'} w-full text-center mt-4`}>
              <button
                className="bg-gray-200 text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-300"
                onClick={handleTrueFalse}
              >
                New Address
              </button>
            </div>
        </div>


          <div className={`${showForm ? 'flex':'hidden'} flex-col-reverse md:flex-row   bg-white text-black mx-auto w-[100%]`}>
            <div className="min-h-screen md:w-1/2 flex items-center justify-center">
              <div className="w-full p-8 bg-gray-100 shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-center">
                  Add New Address
                </h1>

                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <label className="text-xl font-bold mb-2" htmlFor="fullName">
                      Full Name
                    </label>
                    <span className="text-red-600 text-3xl pt-[6px]">*</span>
                    <input
                      type="text"
                      id="fullName"
                      name="fullName"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Full Name"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xl font-bold mb-2" htmlFor="mobile">
                      Mobile Number
                    </label>
                    <span className="text-red-600 text-3xl pt-[6px]">*</span>
                    <input
                      type="tel"
                      id="mobile"
                      name="mobileNo"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="1234567890"
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xl font-bold mb-2" htmlFor="country">
                      Country
                    </label>
                    <span className="text-red-600 text-3xl pt-[6px]">*</span>
                    <input
                      type="text"
                      id="country"
                      name="country"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder={`${placeholdervalue.country || "Country"}`}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xl font-bold mb-2" htmlFor="state">
                      State
                    </label>
                    <span className="text-red-600 text-3xl pt-[6px]">*</span>
                    <input
                      type="text"
                      id="state"
                      name="state"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder={`${placeholdervalue.state || "State"}`}
                      required
                    />
                  </div>

                  <div>
                    <label className="text-xl font-bold mb-2" htmlFor="city">
                      City / Village
                    </label>
                    <span className="text-red-600 text-3xl pt-[6px]">*</span>
                    <input
                      type="text"
                      id="cityVillage"
                      name="cityVillage"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder={`${placeholdervalue.city || placeholdervalue.village || placeholdervalue.town || "City / Village"}`}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xl font-bold mb-2" htmlFor="pincode">
                      Pincode (Optional)
                    </label>
                    <input
                      type="text"
                      id="pincode"
                      name="pincode"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder={`${placeholdervalue.postcode|| "Example : 500018"}`}
                    />
                  </div>

                  <div>
                    <label className="text-xl font-bold mb-2" htmlFor="address">
                      Full Address
                    </label>
                    <span className="text-red-600 text-3xl pt-[6px]">*</span>
                    <span className="block font-bold">
                      City/village/street/House No
                    </span>
                    <textarea
                      type="text"
                      id="fulladdress"
                      name="fulladdress"
                      className="w-full p-3 border border-gray-300 rounded-lg min-h-[60px]"
                      required
                      placeholder={`${FormattedAddress || "Example:  Begumpet , Hyderabad 50018 10-10-99 1st floor"}`}

                    />
                  </div>

                  <div>
                    <label className="block text-xl font-bold mb-2" htmlFor="altContact">
                      Alternative Contact (Optional)
                    </label>
                    <input
                      type="tel"
                      id="altcontactNo"
                      name="altcontactNo"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="9287654321"
                    />
                  </div>

                  <div>
                    <label className="block text-xl font-bold mb-2" htmlFor="landmark">
                      Landmark (Optional)
                    </label>
                    <input
                      type="text"
                      id="landmark"
                      name="landmark"
                      className="w-full p-3 border border-gray-300 rounded-lg"
                      placeholder="Near Metro Station"
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="w-full bg-[#ff8f9c] text-white font-semibold py-3 rounded-lg hover:bg-[#ff7b8a] transition duration-300"
                    >
                      Create New Address
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <LeafletMap setLocationN={(loc) => setLocationN({ latitude: loc.lat, longitude: loc.lng })} getCountryStateCity={getCountryStateCity}/>
          </div>
      </div>
    </>
  );
};

export default Checkout;