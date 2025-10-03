"use client";
import { useState } from 'react';
import { FaUser, FaBox, FaClock, FaCheckCircle, FaTimesCircle, FaTruck, FaTimes, FaCamera } from 'react-icons/fa';

export default function Profile() {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
    joinDate: "January 2023"
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [editForm, setEditForm] = useState({ ...profile });
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const [orders, setOrders] = useState([
    {
      id: "ORD-2024-001",
      date: "2024-09-15",
      total: 129.99,
      status: "delivered",
      deliveryDate: "2024-09-18"
    },
    {
      id: "ORD-2024-002",
      date: "2024-09-18",
      total: 89.50,
      status: "shipped",
      estimatedDelivery: "2024-09-22"
    },
    {
      id: "ORD-2024-003",
      date: "2024-09-19",
      total: 45.99,
      status: "processing",
      estimatedDelivery: "2024-09-25"
    },
    {
      id: "ORD-2024-004",
      date: "2024-09-20",
      total: 199.99,
      status: "confirmed",
      estimatedDelivery: "2024-09-27"
    }
  ]);

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

  const canCancelOrder = (status) => {
    return status !== 'delivered' && status !== 'cancelled' && status !== 'shipped';
  };

  const handleCancelOrder = (orderId) => {
    setOrders(orders.map(order =>
      order.id === orderId
        ? {
          ...order,
          status: 'cancelled',
          cancelledAt: new Date().toISOString() // add cancelled time
        }
        : order
    ));
  };


  const handleEditProfile = () => {
    setEditForm({ ...profile });
    setShowEditModal(true);
  };

  const handleSaveProfile = () => {
    setProfile({ ...editForm });
    setShowEditModal(false);
  };

  const handleInputChange = (field, value) => {
    setEditForm(prev => ({ ...prev, [field]: value }));
  };

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }).format(new Date(dateString)).replace(',', '');
  };

  const [showOrderCancelConfirm, setShowOrderCancelConfirm] = useState(false)

  return (
    <>
      <div className="min-h-screen bg-gray-50 py-4 sm:py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="relative flex-shrink-0">
                <img
                  src={profile.avatar}
                  alt="Profile"
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-gray-200"
                />
                <div className="absolute bottom-0 right-0 bg-green-500 w-5 h-5 sm:w-6 sm:h-6 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{profile.name}</h1>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center justify-center sm:justify-start space-x-2">
                    <FaUser className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="text-sm sm:text-base">{profile.email}</span>
                  </div>
                  <div className="text-xs sm:text-sm">
                    Member since {profile.joinDate}
                  </div>
                </div>
              </div>
              <button
                onClick={handleEditProfile}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
              >
                Edit Profile
              </button>
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
              {orders.map((order) => (
                <div key={order.id} className="p-4 sm:p-6 hover:bg-gray-100 transition-colors">
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
                          <span className="font-medium">Date:</span> {formatDate(order.date)}
                        </div>
                        <div>
                          <span className="font-medium">Total:</span> ${order.total}
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
                            ? formatDate(order.cancelledAt)
                            : formatDate(order.deliveryDate || order.estimatedDelivery)}
                        </div>

                      </div>

                    </div>

                    {canCancelOrder(order.status) && (
                      <div className="flex justify-center items-center">
                        <button
                          onClick={() => { setSelectedOrderId(order.id); setShowOrderCancelConfirm(true); }}
                          className="bg-red-100 hover:bg-red-200 text-red-700 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors flex-1 lg:flex-none"
                        >
                          Cancel
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {orders.length === 0 && (
              <div className="p-8 sm:p-12 text-center">
                <FaBox className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-600 text-sm sm:text-base">When you place your first order, it will appear here.</p>
                <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base">
                  Start Shopping
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Edit Profile Modal */}
        {showEditModal && (
          <div onClick={() => setShowEditModal(false)} className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
              <div className="p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900">Edit Profile</h3>
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Avatar Section */}
                  <div className="text-center">
                    <div className="relative inline-block">
                      <img
                        src={editForm.avatar}
                        alt="Profile"
                        className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-gray-200 mx-auto"
                      />
                      <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
                        <FaCamera className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className='z-999'>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      value={editForm.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={editForm.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showOrderCancelConfirm && (
        <div onClick={() => setShowOrderCancelConfirm(false)} className="fixed inset-0 bg-black/50 bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div onClick={(e) => e.stopPropagation()} className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="text-center mb-6">
              <h3 className="text-xl font-semibold mb-2">Order Cancel </h3>
              <p className="text-gray-600">
                Are you sure you want to cancel this order ?
              </p>
            </div>


            <div className="flex gap-3">
              <button
                onClick={() => setShowOrderCancelConfirm(false)}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => { handleCancelOrder(selectedOrderId); setShowOrderCancelConfirm(false); }}
                className="flex-1 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

    </>);
}