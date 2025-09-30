import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchMenuItems, createOrder } from '../api';
import MenuItemCard from '../components/MenuItemCard';
import { CartContext } from '../context/CartContext';

const MenuPage = () => {
  const [groupedItems, setGroupedItems] = useState({});
  const { cart, clearCart, removeFromCart, removeItemCompletely, addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const getItems = async () => {
      try {
        const { data } = await fetchMenuItems();
        
        // Group items by their category property
        const grouped = data.reduce((accumulator, item) => {
          const category = item.category || 'Other'; // Use 'Other' as a fallback
          
          if (!accumulator[category]) {
            accumulator[category] = []; // Create a new array for the category if it doesn't exist
          }
          
          accumulator[category].push(item);
          return accumulator;
        }, {});

        setGroupedItems(grouped);
      } catch (error) {
        console.error("Failed to fetch menu items:", error);
      }
    };

    getItems();
  }, []);

  const handlePlaceOrder = async () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    const orderItems = cart.map((item) => ({
      menuItemId: item._id,
      quantity: item.quantity,
    }));

    try {
      const { data: newOrder } = await createOrder({ items: orderItems });
      clearCart();
      navigate(`/order-status/${newOrder._id}`);
    } catch (error) {
      alert(`Failed to place order: ${error.response.data.message}`);
    }
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container">
      <h1>Canteen Menu</h1>
      
      {Object.keys(groupedItems).length > 0 ? (
        Object.keys(groupedItems).map(category => (
          <div key={category} className="category-section">
            <h2>{category}</h2>
            <div className="menu-list">
              {groupedItems[category].map(item => (
                <MenuItemCard key={item._id} item={item} />
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>Loading menu...</p>
      )}

      <div className="cart-summary">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <p>Cart is empty</p>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item._id} className="cart-item">
                  <div className="cart-item-info">
                    <span className="cart-item-name">{item.name}</span>
                    <span className="cart-item-price">₹{item.price.toFixed(2)} each</span>
                  </div>
                  <div className="cart-item-controls">
                    <button 
                      onClick={() => removeFromCart(item._id)}
                      className="quantity-btn decrease"
                      title="Remove one"
                    >
                      -
                    </button>
                    <span className="quantity-display">{item.quantity}</span>
                    <button 
                      onClick={() => addToCart(item)}
                      className="quantity-btn increase"
                      title="Add one"
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                    <button 
                      onClick={() => removeItemCompletely(item._id)}
                      className="remove-item-btn"
                      title="Remove all"
                    >
                      ×
                    </button>
                  </div>
                  <div className="cart-item-total">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-total">
              <h3>Total: ₹{cartTotal.toFixed(2)}</h3>
            </div>
            <button onClick={handlePlaceOrder} className="place-order-btn">
              Place Order
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default MenuPage;