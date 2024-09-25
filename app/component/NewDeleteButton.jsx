'use client'

import { toast,ToastContainer } from "react-toastify";
import { MdOutlineDeleteForever } from "react-icons/md";


const NewDeleteButton = ({ cartsData, setCartsData, product }) => {
  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`/api/cartjs/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const newdata = cartsData.filter((product) => product.productId !== productId);
        setCartsData(newdata);
        toast.success('Product deleted successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        const result = await response.json();
        console.error('Failed to delete the product:', result.Message);
      }
    } catch (error) {
      console.error('Failed to delete the product:', error);
    }
  };

  return (<>
    <button
          onClick={() => handleDelete(product.productId)}
    ><MdOutlineDeleteForever className="text-red-500 hover:text-red-700 text-[35px]"/></button>
    <ToastContainer/>
    </>
  );
};

export default NewDeleteButton;
