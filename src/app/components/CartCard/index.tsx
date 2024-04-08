import { useEffect, useState } from "react";
import axiosInstance from "../../../../axiosInstance";

const Page = ({ title, productQuantity, productId, userId, handleReload, price }: any) => {
  const [quantity, setQuantity] = useState(productQuantity);

  const updateProduct = async (operation: any) => {
    let tempQuantity = productQuantity;
    if (operation === "add") {
      tempQuantity++;
    } else if (operation === "remove") {
      if (tempQuantity > 1) tempQuantity--;
    }
    const updateResponse = await axiosInstance.post('/cart/update-product', {
      userId,
      productId,
      quantity: tempQuantity,
    });
    if (updateResponse.data.success) {
      setQuantity(tempQuantity);
    }
  };

  const handleRemove = async () => {
    const removeResponse = await axiosInstance.post("/cart/delete-product", {
      productId: productId,
      userId: userId,
    });
    if (removeResponse.data.success) {
      await handleReload();
    }
  };

  useEffect(() => {
    handleReload();
  }, [quantity]);

  return (
    <div className="cart-container border-b border-gray-300 p-4 flex items-center justify-between">
   <h3 className="title text-lg font-bold text-black">{title}</h3>
      <div className="flex items-center space-x-2">
        <button
          className="minus bg-gray-200 px-2 py-1 rounded"
          onClick={() => updateProduct("remove")}
        >
          -
        </button>
        <p className="quantity">{quantity}</p>
        <button
          className="plus bg-gray-200 px-2 py-1 rounded"
          onClick={() => updateProduct("add")}
        >
          +
        </button>
        <button
          className="remove-product bg-red-500 text-white px-2 py-1 rounded"
          onClick={handleRemove}
        >
          Remove from Cart
        </button>
        <p className="price">${price}</p>
      </div>
    </div>
  );
};

export default Page;
