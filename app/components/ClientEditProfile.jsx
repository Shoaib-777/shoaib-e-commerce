"use client"

import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";

const EditUserProfileComp = dynamic(() => import("@/app/components/EditUserProfileComp"), { ssr: false });


const ClientEditProfile = ({ userId,session }) => {
  return (
    <>
      <SessionProvider session={session}>
        <EditUserProfileComp userId={userId} />
      </SessionProvider>
    </>
  )
}

export default ClientEditProfile