"use client"
import { useEditProfileStore } from '@/store/useEditProfileStore'
import React from 'react'

const EditProfileBtn = () => {
    const { toggleEditTrue } = useEditProfileStore()
    return (
        <button
            onClick={toggleEditTrue}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base"
        >
            Edit Profile
        </button>
    )
}

export default EditProfileBtn