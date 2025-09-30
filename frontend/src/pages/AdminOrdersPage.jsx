import React, { useState, useEffect } from 'react';
import { fetchOrders, updateOrderStatus } from '../api';

const AdminOrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      const { data } = await fetchOrders();
      setOrders(data);
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      // Refresh orders after update
      loadOrders();
    } catch (err) {
      setError('Failed to update order status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'confirmed': return '#17a2b8';
      case 'completed': return '#28a745';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) return <div className="loading">Loading orders...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="container">
      <div className="admin-header">
        <h1>Order Management</h1>
        <p>Manage and update order statuses</p>
      </div>

      {orders.length === 0 ? (
        <div className="no-orders">
          <p>No orders found</p>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order._id} className="order-card admin">
              <div className="order-header">
                <div className="order-id">
                  <strong>Order #{order._id.slice(-6)}</strong>
                </div>
                <div 
                  className="order-status-badge"
                  style={{ backgroundColor: getStatusColor(order.status) }}
                >
                  {order.status.toUpperCase()}
                </div>
              </div>

              <div className="order-details">
                <p><strong>Customer:</strong> {order.userId?.name || 'Unknown'}</p>
                <p><strong>Email:</strong> {order.userId?.email || 'Unknown'}</p>
                <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
                <p><strong>Total:</strong> ₹{order.totalAmount.toFixed(2)}</p>
                
                <div className="order-items">
                  <h4>Items:</h4>
                  <ul>
                    {order.items.map((item, index) => (
                      <li key={index}>
                        {item.menuItemId?.name || 'Unknown Item'} × {item.quantity}
                        {item.menuItemId?.price && (
                          <span className="item-price">
                            (₹{(item.menuItemId.price * item.quantity).toFixed(2)})
                          </span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="order-actions">
                <label htmlFor={`status-${order._id}`}>Update Status:</label>
                <select
                  id={`status-${order._id}`}
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="status-select"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrdersPage;