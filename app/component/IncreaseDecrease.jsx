'use client';

import { useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa6";
import axios from "axios";

const IncreaseDecrease = ({ product, setCartsData }) => {
    const [loading, setLoading] = useState(false);

    const handleDecreaseQuantity = async (product) => {
        if (product.productQuantity > 1) {
            setLoading(true);
            try {
                const updatedProduct = { ...product, productQuantity: Number(product.productQuantity) - 1 };
                await axios.put("/api/cartjs", { productId: product.productId, productQuantity: updatedProduct.productQuantity });

                setCartsData((prevData) =>
                    prevData.map((item) =>
                        item.productId === product.productId ? updatedProduct : item
                    )
                );
            } catch (error) {
                console.error("Error decreasing quantity", error);
            } finally {
                setLoading(false);
            }
        }
    };

    const handleIncreaseQuantity = async (product) => {
        setLoading(true);
        try {
            const updatedProduct = { ...product, productQuantity: Number(product.productQuantity) + 1 };
            await axios.put("/api/cartjs", { productId: product.productId, productQuantity: updatedProduct.productQuantity });

            setCartsData((prevData) =>
                prevData.map((item) =>
                    item.productId === product.productId ? updatedProduct : item
                )
            );
        } catch (error) {
            console.error("Error increasing quantity", error);
        } finally {
            setLoading(false);
        }
    };

    return (<>
    
        <div className="flex items-center gap-x-2 md:gap-x-4 relative">
            <button onClick={() => handleDecreaseQuantity(product)} className={`${loading ? 'bg-red-300':""}`} disabled={loading}>
                <FaMinus className="border border-black p-1 text-2xl font-bold fill-red-700" />
            </button>
            <span className="font-semibold">{product.productQuantity}</span>
            <button onClick={() => handleIncreaseQuantity(product)} className={`${loading ? 'bg-blue-500':""}`} disabled={loading}>
                <IoMdAdd className="border border-black p-1 text-2xl font-bold fill-blue-800" />
            </button>
            <div className={`absolute ${loading ? "block": "hidden"}  -bottom-9 left-3`}>
                <span className="font-semibold " >Loading...</span>
            </div>
        </div>
    </>
    );
};

export default IncreaseDecrease;