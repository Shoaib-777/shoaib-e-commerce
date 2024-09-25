'use client';

import { IoMdAdd } from "react-icons/io";
import { FaMinus } from "react-icons/fa6";
import axios from "axios";

const IncreaseDecrease = ({ product, setCartsData }) => {
    const handleDecreaseQuantity = async (product) => {
        if (product.productQuantity > 1) {
            try {
                const updatedProduct = { ...product, productQuantity: Number(product.productQuantity) - 1 };
                await axios.put("/api/cartjs", { productId: product.productId, productQuantity: updatedProduct.productQuantity });

                // Update the local cart data
                setCartsData((prevData) =>
                    prevData.map((item) =>
                        item.productId === product.productId ? updatedProduct : item
                    )
                );
            } catch (error) {
                console.error("Error decreasing quantity", error);
            }
        }
    };

    const handleIncreaseQuantity = async (product) => {
        try {
            const updatedProduct = { ...product, productQuantity: Number(product.productQuantity) + 1 };
            await axios.put("/api/cartjs", { productId: product.productId, productQuantity: updatedProduct.productQuantity });

            // Update the local cart data
            setCartsData((prevData) =>
                prevData.map((item) =>
                    item.productId === product.productId ? updatedProduct : item
                )
            );
        } catch (error) {
            console.error("Error increasing quantity", error);
        }
    };

    return (
        <div className="flex items-center gap-x-2 md:gap-x-4">
            <button onClick={() => handleDecreaseQuantity(product)}>
                <FaMinus className="border border-black p-1 text-2xl font-bold fill-red-500" />
            </button>
            <span className="font-semibold">{product.productQuantity}</span>
            <button onClick={() => handleIncreaseQuantity(product)}>
                <IoMdAdd className="border border-black p-1 text-2xl font-bold fill-blue-600" />
            </button>
        </div>
    );
};

export default IncreaseDecrease;

