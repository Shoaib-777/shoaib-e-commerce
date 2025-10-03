"use client";
import React, { useState } from 'react';
import {
  FaUser,        // User
  FaMapMarkerAlt,// MapPin
  FaGlobe,       // Globe
  FaBuilding,    // Building2
  FaHome,        // Home
  FaEnvelope,    // Mail
  FaCheck,       // Check
  FaBookmark     // Bookmark
} from "react-icons/fa";

import { FaPhone } from "react-icons/fa6";
import { IoClose } from 'react-icons/io5';


export default function NewAddressCard({onSave,onToggle}) {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    alternatePhone: '',
    email: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    addressType: 'Home',
    saveAs: ''
  });

  const [errors, setErrors] = useState({});

  const countries = ['India', 'United States', 'United Kingdom', 'Canada', 'Australia'];
  const addressTypes = ['Home', 'Office', 'Other'];

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.mobileNumber.trim()) newErrors.mobile = 'Mobile number is required';
    else if (!/^\d{10}$/.test(formData.mobileNumber.replace(/\D/g, ''))) {
      newErrors.mobile = 'Please enter a valid 10-digit mobile number';
    }
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      console.log("sucess bro")
      onSave(formData)
      onToggle()
      console.log('Form submitted:', formData);
      alert('Address saved successfully!');
    }
  };

  return (
    <div className=" mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
          <FaMapMarkerAlt className="text-blue-600" />
          Add Delivery Address
        </h2>
        <p className="text-gray-600 mt-1">Please provide your delivery details</p>
      </div>

      <form className="space-y-4">
        {/* Full Name */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <FaUser className="w-4 h-4" />
            Full Name *
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.fullName ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="Enter your full name"
          />
          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
        </div>

        {/* Mobile Numbers Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <FaPhone className="w-4 h-4" />
              Mobile Number *
            </label>
            <input
              type="tel"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.mobile ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="10-digit mobile number"
            />
            {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <FaPhone className="w-4 h-4" />
              Alternate Phone (Optional)
            </label>
            <input
              type="tel"
              name="alternatePhone"
              value={formData.alternatePhone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Alternate number"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <FaEnvelope className="w-4 h-4" />
            Email Address (Optional)
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="your.email@example.com"
          />
        </div>

        {/* Address Line 1 */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <FaHome className="w-4 h-4" />
            Address Line 1 *
          </label>
          <input
            type="text"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.addressLine1 ? 'border-red-500' : 'border-gray-300'
              }`}
            placeholder="House/Flat/Block No., Building Name"
          />
          {errors.addressLine1 && <p className="text-red-500 text-xs mt-1">{errors.addressLine1}</p>}
        </div>

        {/* Address Line 2 */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Address Line 2 (Optional)
          </label>
          <input
            type="text"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Street Name, Area"
          />
        </div>

        {/* Landmark */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Landmark (Optional)
          </label>
          <input
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Near famous place, monument, etc."
          />
        </div>

        {/* City, State, Pincode Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <FaBuilding className="w-4 h-4" />
              City *
            </label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.city ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="City"
            />
            {errors.city && <p className="text-red-500 text-xs mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              State *
            </label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.state ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="State"
            />
            {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Pincode *
            </label>
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.pincode ? 'border-red-500' : 'border-gray-300'
                }`}
              placeholder="6-digit pincode"
            />
            {errors.pincode && <p className="text-red-500 text-xs mt-1">{errors.pincode}</p>}
          </div>
        </div>

        {/* Country */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
            <FaGlobe className="w-4 h-4" />
            Country *
          </label>
          <select
            name="country"
            value={formData.country}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {countries.map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
        </div>

        {/* Address Type */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Address Type
          </label>
          <div className="flex gap-4">
            {addressTypes.map(type => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="addressType"
                  value={type}
                  checked={formData.addressType === type}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{type}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Save Address As - only show if "Other" is selected */}
        {formData.addressType === "Other" && (
          <div className="mt-4">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
              <FaBookmark className="w-4 h-4" />
              Save Address As (Optional)
            </label>
            <input
              type="text"
              name="saveAs"
              value={formData.saveAs}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Home, Office, Mom's Place"
            />
          </div>
        )}

        {/* Submit Button */}
        <div className="pt-4 flex flex-col md:flex-row gap-y-2 md:gap-y-0 justify-between items-center">
          <button
            type="submit"
            className="w-full md:w-[30%] bg-gray-300 hover:bg-gray-400 text-white font-medium py-3 px-4 rounded-md transition duration-200 flex items-center justify-center gap-2"
            onClick={onToggle}
          >
            <IoClose  className="w-4 h-4" />
            Cancel
          </button>
          <button
            type="submit"
            className="w-full md:w-[60%] bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md transition duration-200 flex items-center justify-center gap-2"
            onClick={handleSubmit}
          >
            <FaCheck className="w-4 h-4" />
            Save Address
          </button>
        </div>
      </form>
    </div>
  );
}
