"use client";
import { FaBuilding, FaCheck, FaChevronLeft, FaCreditCard, FaDollarSign, FaEdit, FaHome, FaLock, FaMapMarkerAlt, FaPlus, FaShoppingBag, FaShoppingCart, FaTrashAlt, FaWallet } from "react-icons/fa";
import { useEffect, useState } from "react";
import { FiAlertTriangle } from "react-icons/fi";
import { generateOrderId } from "@/utils/functions";
import { useRouter } from "next/navigation";
import { useAddressStore } from "@/store/useAddressStore";
import { useCartStore } from "@/store/useCartStore";
import { useOrderStore } from "@/store/useOrderStore";
import { getUserIDCSR } from "@/utils/GetCSrUserId";
import NewAddressCard from "./NewAddressCard";


//address card component
const AddressCard = ({ selectedAddress, setSelectedAddress, showNewAddress, setShowNewAddress, progressStage, setProgressStage }) => {
  const { isLoading, getUserAddress, SavedAddresses, removeAddress } = useAddressStore()
  const handleAddressDelete = (id) => {
    // later add userId as a new parameter
    removeAddress(id)
  }
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
      <div className="flex flex-col gap-y-1 sm:gap-y-0 sm:flex-row justify-between items-center mb-6">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <FaMapMarkerAlt className="text-red-500" />
          Delivery Address
        </h2>
        <ProgressBar progressStage={progressStage} />
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-4">
          {SavedAddresses.map((address) => (
            <div
              key={address._id}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${selectedAddress?._id === address._id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
                }`}
              onClick={() => setSelectedAddress(address)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="flex items-center gap-2">
                      {address.addressType.toLowerCase() === 'home' ? <FaHome size={16} /> : <FaBuilding size={16} />}
                      <span className="font-semibold text-gray-800">{address.fullName}</span>
                    </div>
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded-full capitalize">
                      {address.addressType}
                    </span>
                    {selectedAddress?._id === address._id && (
                      <FaCheck className="text-blue-500" size={20} />
                    )}
                  </div>
                  <p className="text-gray-600 mb-1">{address.address1}</p>
                  <p className="text-gray-600 mb-2">
                    {address.city}, {address.state} - {address.pincode}
                  </p>
                  <p className="text-gray-500 text-sm">{address.phone}</p>
                </div>
                <button className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                  <FaEdit size={16} />
                </button>
                <button onClick={() => handleAddressDelete(address._id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                  <FaTrashAlt size={16} />
                </button>
              </div>
            </div>
          ))}

          {/* Add New Address */}
          <div className="">
            {!showNewAddress ? (
              <button
                onClick={() => setShowNewAddress(true)}
                className="w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-gray-500 hover:border-blue-500 hover:text-blue-500 transition-colors flex items-center justify-center gap-2"
              >
                <FaPlus size={20} />
                Add New Address
              </button>
            ) : (
              <NewAddressCard
                isOpen={showNewAddress}
                onToggle={() => setShowNewAddress(!showNewAddress)}
              />
            )}
          </div>
        </div>
      )}


      {/* progress to 2  */}
      <div className="flex justify-end py-4">
        <button
          disabled={!selectedAddress}
          onClick={() => setProgressStage(prev => prev + 1)}
          className={`w-[200px] px-4 py-2 rounded-lg font-medium text-white 
    ${selectedAddress ? "bg-green-500 hover:bg-green-700" : "bg-gray-300 cursor-not-allowed"}`}
        >
          Continue
        </button>

      </div>
    </div>
  )
}


// payment method component
const PaymentMethod = ({ cardDetails, setCardDetails, paymentMethods, selectedPayment, setSelectedPayment, progressStage, setProgressStage }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-2 sm:p-6 mb-8">
      {/* progress to 1  */}
      <div className="flex justify-between items-center mb-6 py-2">
        <button onClick={() => setProgressStage(prev => Math.max(prev - 1, 1))}>
          <FaChevronLeft className="size-5" />
        </button>

        <ProgressBar progressStage={progressStage} />
      </div>
      <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
        <FaCreditCard className="text-green-600" />
        Payment Method
      </h2>


      <div className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${selectedPayment === method.id
              ? 'border-green-500 bg-green-50'
              : 'border-gray-200 hover:border-gray-300'
              }`}
            onClick={() => setSelectedPayment(method.id)}
          >
            <div className="flex items-center gap-4">
              <method.icon
                size={24}
                className={selectedPayment === method.id ? 'text-green-600' : 'text-gray-600'}
              />
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800">{method.name}</h3>
                <p className="text-gray-500 text-sm">{method.description}</p>
              </div>
              {selectedPayment === method.id && (
                <FaCheck className="text-green-500" size={20} />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Card Details Form */}
      {selectedPayment === 'card' && (
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-semibold mb-4">Card Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Card Number (1234 5678 9012 3456)"
              value={cardDetails.number}
              onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="Cardholder Name"
              value={cardDetails.name}
              onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="MM/YY"
              value={cardDetails.expiry}
              onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <input
              type="text"
              placeholder="CVV"
              value={cardDetails.cvv}
              onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      )}
      {/* progress to 3  */}
      <div className="flex justify-end py-4">
        <button disabled={!selectedPayment}
          onClick={() => setProgressStage(prev => prev + 1)}
          className={`w-[200px] px-4 py-2 rounded-lg font-medium text-white 
    ${selectedPayment ? "bg-green-500 hover:bg-green-700" : "bg-gray-300 cursor-not-allowed"}`}>Continue</button>
      </div>
    </div>

  )
}

// Order Confirmation Component
const OrderConfirmation = ({ onConfirm, handleFinalOrder, progressStage, setProgressStage, selectedAddress, setOrderId }) => {
  const userId = getUserIDCSR()
  const [showAlert, setShowAlert] = useState(false);

  const { cartData } = useCartStore()
  const { placeOrder } = useOrderStore()

  const orderSubTotal = () => {
    return cartData?.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };

  const orderTotal = (orderSubTotal() + 20).toFixed(2);

  const handleConfirmOrder = () => {
    setShowAlert(true);
  };

  const handleFinalConfirm = () => {

    const orderedAt = new Date().toISOString();
    const expectedDelivery = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();
    const newOrderId = generateOrderId();
    setOrderId(newOrderId)

    // 🧠 Convert cartData to match backend schema
    const items = cartData.map((item) => ({
      product: item.product._id,       // only send the ObjectId
      quantity: item.quantity,
      price: item.product.price,
    }));

    const shippingAddress = selectedAddress?._id;

    const totalAmount = parseFloat(orderTotal);
    const status = "pending";

    const data = {
      user: userId,
      orderId: newOrderId,
      orderedAt,
      expectedDelivery,
      items,
      shippingAddress,
      status,
      totalAmount,
    };

    console.log("✅ Final Order Data:", data);
    placeOrder(data); // send data to backend
    setShowAlert(false);
    onConfirm();
    handleFinalOrder();
  };


  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-2 sm:p-6 mb-6">
        {/* progress to 2  */}
        <div className=" mb-6 py-4 flex justify-between items-center">
          <button onClick={() => setProgressStage(prev => Math.max(prev - 1, 1))}>
            <FaChevronLeft className="size-5" />
          </button>
          <ProgressBar progressStage={progressStage} />
        </div>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <FaShoppingCart className="w-5 h-5 text-blue-500" />
          Order Summary
        </h2>

        <div className="mb-6 space-y-4">
          {cartData.map(item => (
            <div key={item.product._id} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className="size-12 rounded object-contain p-1"
                />
                <div>
                  <p className="font-medium text-gray-800 line-clamp-1 ">{item.product.title}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
              </div>
              <span className="font-medium text-gray-700">
                ${(item.product.price * item.quantity).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className="space-y-3 mb-4">
          <div className="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>${orderSubTotal()}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>Shipping</span>
            <span>$20.00</span>
          </div>
          <div className="border-t pt-3 flex justify-between font-semibold text-lg">
            <span>Total</span>
            <span>${orderTotal}</span>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <div className="flex items-start gap-2">
            <FiAlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-red-800 mb-1">Demo Notice</h4>
              <p className="text-sm text-red-700">
                This is a demo checkout. Use dummy card numbers (4111 1111 1111 1111) or cash payment only.
                No actual orders will be processed or charged.
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleConfirmOrder}
          className="w-full bg-green-500 text-white py-4 rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <FaLock className="w-5 h-5" />
          Confirm & Place Order
        </button>
      </div>

      {/* Confirmation Alert Modal */}
      {showAlert && (
        <div onClick={() => setShowAlert(false)} className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheck className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Confirm Your Order</h3>
              <p className="text-gray-600">
                Are you sure you want to place this order for ${orderTotal}?
              </p>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
              <p className="text-sm text-red-700 text-center">
                <strong>Demo Mode:</strong> No actual payment will be processed
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowAlert(false)}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleFinalConfirm}
                className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const ProgressBar = ({ progressStage }) => {
  const steps = ["Address", "Payment", "Confirm"];

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      {steps.map((label, index) => {
        const step = index + 1;
        const active = step === progressStage;
        const completed = step < progressStage;

        return (
          <div key={step} className="flex items-center gap-1 sm:gap-2">
            <div
              className={`size-6 sm:size-8 rounded-full flex items-center justify-center font-medium
                ${completed ? "bg-green-500 text-white" : active ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-600"}
              `}
            >
              {step}
            </div>
            <span className={`text-xs sm:text-sm ${active ? "font-normal sm:font-semibold text-blue-600" : "text-gray-500"}`}>
              {label}
            </span>
            {step < steps.length && (
              <div className={`w-8 h-[2px] ${completed ? "bg-green-500" : "bg-gray-300"}`} />
            )}
          </div>
        );
      })}
    </div>
  );
};





const CheckoutMain = () => {
  const router = useRouter()
  const userId = getUserIDCSR()
  const {getCartData}= useCartStore()
  const { isLoading, getUserAddress } = useAddressStore()
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPayment, setSelectedPayment] = useState('');
  const [showNewAddress, setShowNewAddress] = useState(false);
  const [showOrderConfirm, setShowOrderConfirm] = useState(false);
  const [orderId, setOrderId] = useState("")


  const [progressStage, setProgressStage] = useState(1)


  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: FaCreditCard, description: 'Visa, MasterCard, RuPay' },
    { id: 'wallet', name: 'Digital Wallet', icon: FaWallet, description: 'PayPal, PhonePe, GPay' },
    { id: 'cod', name: 'Cash on Delivery', icon: FaDollarSign, description: 'Pay when you receive' }
  ];


  const handleOrderConfirm = () => {
    if (!selectedAddress || !selectedPayment) {
      alert('Please select both address and payment method');
      return;
    }
    setShowOrderConfirm(true);
  };

  const handleFinalOrder = () => {

    // Reset form
    setSelectedAddress(null);
    setSelectedPayment('');
    setCardDetails({ number: '', expiry: '', cvv: '', name: '' });
    getCartData(userId)
    setTimeout(() => {
      setShowOrderConfirm(false);
      router.push('/profile')
    }, 2000)
  };

  useEffect(() => {
    getUserAddress(userId)
  }, [])


  if (showOrderConfirm) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl border border-gray-300 p-8 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FaCheck className="w-10 h-10 text-green-500" />
          </div>
          <h2 className="text-2xl font-semibold mb-2">Order Placed Successfully!</h2>
          <p className="text-gray-600 mb-4">
            Thank you for your demo order. You'll receive a confirmation email shortly.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-700">
              Order ID: <strong>{orderId}</strong>
            </p>
          </div>
        </div>
      </div>
    )
  }



  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
        <FaShoppingBag className="text-blue-600" />
        Checkout
      </h1>


      {/* Address Selection */}
      {progressStage === 1 && (
        <AddressCard selectedAddress={selectedAddress} setSelectedAddress={setSelectedAddress} showNewAddress={showNewAddress} setShowNewAddress={setShowNewAddress} progressStage={progressStage} setProgressStage={setProgressStage} />
      )}


      {/* Payment Methods */}
      {progressStage === 2 && (
        <PaymentMethod cardDetails={cardDetails} setCardDetails={setCardDetails} paymentMethods={paymentMethods} selectedPayment={selectedPayment} setSelectedPayment={setSelectedPayment} progressStage={progressStage} setProgressStage={setProgressStage} />
      )}


      {/* Order Summary & Confirm */}
      {progressStage === 3 && (
        <OrderConfirmation setOrderId={setOrderId} selectedAddress={selectedAddress} onConfirm={handleOrderConfirm} handleFinalOrder={handleFinalOrder} progressStage={progressStage} setProgressStage={setProgressStage} />
      )}
    </div>
  );
};

export default CheckoutMain;
