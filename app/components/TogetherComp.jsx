"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import Navbar from './Navbar'
import Search from './Search'

const TogetherComp = ({ session }) => {
    return (
        <SessionProvider session={session}>
            <div className='sticky top-0 bg-white z-50'>
                <Navbar />
                <Search />
            </div>

        </SessionProvider>
    )
}

export default TogetherComp