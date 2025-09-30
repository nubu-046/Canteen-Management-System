import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const MenuItemCard = ({ item }) => {
  const { addToCart, getItemQuantityInCart, canAddMore } = useContext(CartContext);
  const isOutOfStock = item.stock === 0;
  const cartQuantity = getItemQuantityInCart(item._id);
  const canAdd = canAddMore(item);

  const handleAddToCart = () => {
    if (canAdd) {
      addToCart(item);
    }
  };

  return (
    <div className={`menu-item-card ${isOutOfStock ? 'disabled' : ''}`}>
      <img src={item.imageUrl} alt={item.name} />
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <div className="details">
        <span>₹{item.price.toFixed(2)}</span>
        <span>Stock: {item.stock}</span>
      </div>
      {cartQuantity > 0 && (
        <div className="cart-quantity-info">
          <span>In cart: {cartQuantity}</span>
        </div>
      )}
      <button 
        onClick={handleAddToCart} 
        disabled={isOutOfStock || !canAdd}
        className={!canAdd && !isOutOfStock ? 'max-reached' : ''}
      >
        {isOutOfStock 
          ? 'Out of Stock' 
          : !canAdd 
            ? 'Max Added' 
            : 'Add to Cart'
        }
      </button>
    </div>
  );
};

export default MenuItemCard;