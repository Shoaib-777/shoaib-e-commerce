"use client"
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import CheckoutMain from '../components/CheckoutMain'



const Checkout = ({session}) => {
  
  return (
    <SessionProvider session={session}>
      <CheckoutMain />
    </SessionProvider>
  )
}

export default Checkout