"use client";
import React, { useState, useEffect } from "react";
import { FaTimes, FaCamera } from "react-icons/fa";
import { CldUploadWidget } from "next-cloudinary";
import { axiosInstance } from "@/axios/axios";
import { useEditProfileStore } from "@/store/useEditProfileStore";
import { getSingleUser } from "@/utils/DataFetching";
import { updateUser } from "@/utils/ServerActions";
 import { ToastContainer, toast } from 'react-toastify';

const EditUserProfileComp = ({userId}) => {
    const { showEdit, toggleEditFalse } = useEditProfileStore();

    const [editForm, setEditForm] = useState({
        name: "",
        email: "",
        phone: "",
        profile: "",
        profilePublicId: "",
    });

    const [newImageData, setNewImageData] = useState(null); // store new uploaded image temporarily

    // ✅ Fetch user profile data
    const getUserProfileData = async (userId) => {
        try {
            const data = await getSingleUser(userId);
            if (data) {
                setEditForm({
                    name: data.name,
                    email: data.email,
                    phone: data.phone,
                    profile: data.profile,
                    profilePublicId: data.profilePublicId,
                });
            }
        } catch (err) {
            console.log("Error fetching user profile:", err);
        }
    };

    // ✅ Handle form input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // ✅ Handle Cloudinary image upload
    const handleUploadSuccess = (result) => {
        if (!result?.info) return;
        const newUrl = result.info.secure_url;
        const newPublicId = result.info.public_id;

        // Temporarily show the new image
        setEditForm((prev) => ({
            ...prev,
            profile: newUrl,
        }));

        // Save new image info for later deletion logic
        setNewImageData({
            url: newUrl,
            publicId: newPublicId,
        });
    };

    // ✅ Delete old image (only if profile successfully updated)
    const deleteOldImage = async (publicId) => {
        if (!publicId) return;
        try {
            await axiosInstance.post("/cloudinary/delete", { public_id: publicId });
            console.log("Old image deleted successfully");
        } catch (err) {
            console.log("Failed to delete old image:", err);
        }
    };

    // ✅ Save profile changes
    const handleSaveProfile = async () => {
        try {
            const payload = {
                ...editForm,
                userId,
                ...(newImageData && {
                    profile: newImageData.url,
                    profilePublicId: newImageData.publicId,
                }),
            };

            const loadingToast = toast.loading("Loading Please Wait...");
            const res = await updateUser(payload);
            toast.dismiss(loadingToast);

            if (res.status === "ok") {
                console.log("Profile updated successfully");
                toast.success("Profile Updated Succsessfully!")
                // ✅ Delete old image only if new image was uploaded & save succeeded
                if (newImageData && editForm.profilePublicId) {
                    await deleteOldImage(editForm.profilePublicId);
                }
                toggleEditFalse(); // Close modal
            }
        } catch (err) {
            toast.error("Something Went Wrong!, Please Try later")
            console.log("Error updating profile:", err);
        }
    };

    useEffect(() => {
        getUserProfileData(userId);
    }, [userId]);

    return (
        <>
        <ToastContainer theme="dark" autoClose={3000}/>
        <div
            onClick={toggleEditFalse}
            className={`${showEdit ? "flex" : "hidden"} fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50`}
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
            >
                <form onSubmit={(e) => e.preventDefault()} className="p-4 sm:p-6">
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                            Edit Profile
                        </h3>
                        <button
                            type="button"
                            onClick={toggleEditFalse}
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
                                    src={
                                        editForm.profile ||
                                        "https://cdn-icons-png.flaticon.com/256/149/149071.png"
                                    }
                                    alt="Profile"
                                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full object-cover border-4 border-gray-200 mx-auto"
                                />
                                <CldUploadWidget
                                    uploadPreset="e_commerce_profiles"
                                    onSuccess={handleUploadSuccess}
                                >
                                    {({ open }) => (
                                        <button
                                            type="button"
                                            onClick={() => open()}
                                            className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
                                        >
                                            <FaCamera className="w-3 h-3 sm:w-4 sm:h-4" />
                                        </button>
                                    )}
                                </CldUploadWidget>
                            </div>
                        </div>

                        {/* Form Fields */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Name
                            </label>
                            <input
                                name="name"
                                type="text"
                                value={editForm.name}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                name="email"
                                type="email"
                                value={editForm.email}
                                onChange={handleInputChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Phone
                            </label>
                            <input
                                name="phone"
                                type="tel"
                                value={editForm.phone}
                                onChange={handleInputChange}
                                maxLength={12}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm sm:text-base"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 mt-6">
                        <button
                            type="button"
                            onClick={toggleEditFalse}
                            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors text-sm sm:text-base"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSaveProfile}
                            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm sm:text-base"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </>);
};

export default EditUserProfileComp;
