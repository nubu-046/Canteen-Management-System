import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchOrderById } from '../api';
import CountdownTimer from '../components/CountdownTimer';

const OrderStatusPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getOrder = async () => {
      try {
        const { data } = await fetchOrderById(id);
        setOrder(data);
      } catch (error) {
        console.error("Failed to fetch order", error);
      } finally {
        setLoading(false);
      }
    };
    getOrder();
  }, [id]);
  
  const handleCountdownComplete = () => {
      // You can add logic to re-fetch the order to check if its status is 'cancelled'
      alert("Order payment/pickup time has expired.");
  };

  if (loading) return <p>Loading order details...</p>;
  if (!order) return <p>Order not found.</p>;

  const orderDeadline = new Date(new Date(order.createdAt).getTime() + 15 * 60 * 1000);

  return (
    <div className="container order-status">
      <h1>Order Placed Successfully!</h1>
      <h2>Order ID: {order._id}</h2>
      <p>Please complete payment or pickup within 15 minutes.</p>
      <div className="timer">
        Time remaining: <CountdownTimer targetDate={orderDeadline} onComplete={handleCountdownComplete} />
      </div>
      <h3>Order Summary</h3>
      <ul>
        {order.items.map(item => (
          <li key={item._id}>
            {item.menuItemId.name} x {item.quantity}
          </li>
        ))}
      </ul>
      <h4>Total Amount: ₹{order.totalAmount.toFixed(2)}</h4>
      <p>Current Status: <strong>{order.status}</strong></p>
    </div>
  );
};

export default OrderStatusPage;