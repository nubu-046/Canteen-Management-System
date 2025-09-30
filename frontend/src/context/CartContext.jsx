import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem._id === item._id);
      if (existingItem) {
        // Check if we can add more (don't exceed available stock)
        if (existingItem.quantity < item.stock) {
          return prevCart.map((cartItem) =>
            cartItem._id === item._id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          );
        }
        // If already at max stock, don't add more
        return prevCart;
      }
      // Add new item to cart
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem._id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        // Decrease quantity by 1
        return prevCart.map((cartItem) =>
          cartItem._id === itemId
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
      } else {
        // Remove item completely if quantity is 1
        return prevCart.filter((cartItem) => cartItem._id !== itemId);
      }
    });
  };

  const removeItemCompletely = (itemId) => {
    setCart((prevCart) => prevCart.filter((cartItem) => cartItem._id !== itemId));
  };

  const getItemQuantityInCart = (itemId) => {
    const cartItem = cart.find((item) => item._id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const canAddMore = (item) => {
    const cartQuantity = getItemQuantityInCart(item._id);
    return cartQuantity < item.stock;
  };
  
  const clearCart = () => {
      setCart([]);
  }

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      removeItemCompletely, 
      getItemQuantityInCart, 
      canAddMore, 
      clearCart 
    }}>
      {children}
    </CartContext.Provider>
  );
};