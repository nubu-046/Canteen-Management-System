import React, { useState, useEffect } from 'react';
import { fetchOrders } from '../api';

const OrderHistoryPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const getOrders = async () => {
      try {
        setLoading(true);
        const { data } = await fetchOrders();
        setOrders(data);
      } catch (err) {
        setError('Failed to load order history');
        console.error('Error fetching orders:', err);
      } finally {
        setLoading(false);
      }
    };
    getOrders();
  }, []);

  if (loading) return <div className="loading">Loading your order history...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <h1>Your Order History</h1>
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div className="order-history-list">
          {orders.map((order) => (
            <div key={order._id} className={`order-card ${order.status}`}>
              <h3>Order ID: {order._id.slice(-6)}</h3>
              <p>Status: <strong>{order.status}</strong></p>
              <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
              <p>Total: ₹{order.totalAmount.toFixed(2)}</p>
              <ul>
                  {order.items.map(item => (
                      <li key={item._id}>
                        {item.menuItemId?.name || 'Unknown Item'} × {item.quantity}
                      </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistoryPage;