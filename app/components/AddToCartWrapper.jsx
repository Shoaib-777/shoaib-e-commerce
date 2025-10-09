// app/components/AddToCartWrapper.js
"use client";

import { SessionProvider } from "next-auth/react";
import dynamic from "next/dynamic";


const AddToCartBtn = dynamic(() => import("./AddToCartBtn"), { ssr: false });

export default function AddToCartWrapper({ productId, session }) {
  return (
    <SessionProvider session={session}>
      <AddToCartBtn productId={productId} />
    </SessionProvider>
  );
}
