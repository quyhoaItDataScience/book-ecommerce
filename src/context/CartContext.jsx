import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const CartContext = createContext();

const CartProvider = (props) => {
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (item) => {
    console.log(item);
    const bookExist = cartItems.some((el) => el._id === item._id);
    if (bookExist) {
      toast.error("Sản phẩm này đã được thêm");
      return;
    }
    toast.success("Thêm vào giỏ hàng");
    setCartItems([...cartItems, item]);
  };

  const removeFromCart = (item) => {
    setCartItems(cartItems.filter((cartItem) => cartItem._id !== item._id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const cartTotal = cartItems.reduce(
    (accumulator, current) => accumulator + current.price,
    0
  );
  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        clearCart,
        cartTotal,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);

export default CartProvider;
