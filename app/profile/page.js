import { formatCustomDate } from '@/utils/FormatDateAndTime';
import { cancelOrder, getUserOrdersServer, getUserProfile } from '@/utils/ServerActions';
import { FaUser, FaBox, FaClock, FaCheckCircle, FaTimesCircle, FaTruck, FaTimes, FaCamera } from 'react-icons/fa';
import EditProfileBtn from '../components/EditProfileBtn';
import ClientEditProfile from '../components/ClientEditProfile';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';
import Link from 'next/link';


export const metadata = {
  title: "Profile",
  description: "Welcome to the FlashCart",
};


export default async function Profile() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-120px)] bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white shadow-xl rounded-xl p-8 text-center border border-gray-300">
        <FaUser className="mx-auto h-14 w-14 text-blue-500" />
        <h2 className="mt-6 text-2xl font-semibold text-gray-800">
          Please login to view your profile
        </h2>
        <p className="mt-2 text-gray-600">
          Access your orders, or order detils you must be Logged In.
        </p>
        <Link href="/login">
          <span className="mt-6 inline-block w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300">
            Go to Login
          </span>
        </Link>
      </div>
    </div>
    )
  }

  // ✅ 2. Extract user ID
  const userId = session.user.id;
  const userProfile = await getUserProfile(userId);
  const orders = await getUserOrdersServer(userId);
  const canCancelOrder = (status) => {
    return status !== 'delivered' && status !== 'cancelled' && status !== 'shipped';
  };


  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <FaCheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />;
      case 'shipped':
        return <FaTruck className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />;
      case 'processing':
        return <FaClock className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />;
      case 'confirmed':
        return <FaBox className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />;
      case 'cancelled':
        return <FaTimesCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />;
      default:
        return <FaClock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'shipped':
        return 'bg-blue-100 text-blue-800';
      case 'processing':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-purple-100 text-purple-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };


  return (
    <>
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative flex-shrink-0">
                <img
                  src={userProfile.profile || "https://cdn-icons-png.flaticon.com/256/149/149071.png"}
                  alt="Profile"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-gray-200"
                />
                <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{userProfile.name}</h1>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center justify-center sm:justify-start space-x-2">
                    <FaUser className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-sm sm:text-base">{userProfile.email}</span>
                  </div>
                  <div className="text-xs sm:text-sm">
                    Member since {formatCustomDate(userProfile.createdAt)}
                  </div>
                </div>
              </div>
              <EditProfileBtn />
            </div>
          </div>

          {/* Order History */}
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-4 sm:p-6 border-b border-gray-200">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center space-x-2">
                <FaBox className="w-5 h-5 sm:w-6 sm:h-6" />
                <span>Order History</span>
              </h2>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">Track and manage your orders</p>
            </div>

            <div className="divide-y divide-gray-200">
              {orders?.orders.length > 0 ? (
                orders?.orders?.map((order) => (
                  <div key={order._id} className="p-4 sm:p-6 hover:bg-gray-100 transition-colors">
                    <div className="flex flex-col lg:flex-row lg:items-start space-y-4 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3 mb-3">
                          <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                            Order {order.id}
                          </h3>
                          <div className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${getStatusColor(order.status)} inline-flex items-center space-x-1 w-fit`}>
                            {getStatusIcon(order.status)}
                            <span className="capitalize">{order.status}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600 mb-3">
                          <div>
                            <span className="font-medium">Date:</span> {formatCustomDate(order.orderedAt)}
                          </div>
                          <div>
                            <span className="font-medium">Total:</span> ${order.totalAmount}
                          </div>
                          <div className="sm:col-span-2 lg:col-span-1">
                            <span className="font-medium">
                              {order.status === 'delivered'
                                ? 'Delivered:'
                                : order.status === 'cancelled'
                                  ? 'Cancelled:'
                                  : 'Est. Delivery:'}
                            </span>{' '}
                            {order.status === 'cancelled'
                              ? formatCustomDate(order.cancelledAt)
                              : formatCustomDate(order.deliveredAt || order.expectedDelivery)}
                          </div>

                        </div>

                      </div>

                      {canCancelOrder(order.status) && (
                        <div className="flex justify-center items-center">
                          <form action={cancelOrder} className='flex justify-center items-center w-full'>
                            <input type="hidden" name="orderId" value={order._id.toString()} />
                            <button
                            type='submit'
                              className="bg-red-100 hover:bg-red-200 text-red-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex-1 lg:flex-none"
                            >
                              Cancel
                            </button>

                          </form>
                        </div>)}

                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 sm:p-12 text-center">
                  <FaBox className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                  <p className="text-gray-600 text-sm sm:text-base">When you place your first order, it will appear here.</p>
                  <Link href={"/"}><button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base">
                    Start Shopping
                  </button></Link>
                </div>
              )}

            </div>
          </div>
        </div>

      </div >

      <ClientEditProfile userId={userId}/>

    </>);
}