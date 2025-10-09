"use client"
import WishlistComp from '../components/WishlistComp';
import { SessionProvider } from 'next-auth/react';


const Wishilst = ({session}) => {
  return (
    <SessionProvider session={session}>
      <WishlistComp session={session}/>
    </SessionProvider>
  )
}

export default Wishilst