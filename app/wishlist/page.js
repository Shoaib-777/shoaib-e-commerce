"use client";


import { SessionProvider } from 'next-auth/react';
import React from 'react'
import WishlistComp from '../components/WishlistComp';


export const metadata = {
  title: "Wishlist",
  description: "Your wishlist items here",
};

const Wishilst = ({session}) => {
  return (
    <SessionProvider session={session}>
      <WishlistComp session={session}/>
    </SessionProvider>
  )
}

export default Wishilst