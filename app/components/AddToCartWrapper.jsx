// app/components/AddToCartWrapper.js
"use client";

import { SessionProvider } from "next-auth/react";
import AddToCartBtn from "./AddToCartBtn";

export default function AddToCartWrapper({ productId, session }) {
  return (
    <SessionProvider session={session}>
      <AddToCartBtn productId={productId} session={session} />
    </SessionProvider>
  );
}
