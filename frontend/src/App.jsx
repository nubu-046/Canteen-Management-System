import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import MenuPage from './pages/MenuPage';
import OrderStatusPage from './pages/OrderStatusPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddItemPage from './pages/AddItemPage'; // Admin page
import AdminOrdersPage from './pages/AdminOrdersPage'; // Admin orders page
import ProtectedRoute from './components/ProtectedRoute';
import { getUserFromToken, isAuthenticated, isAdmin, logout } from './utils/auth';
import './index.css';

function App() {
  const user = getUserFromToken();
  const authenticated = isAuthenticated();
  const userIsAdmin = isAdmin();

  return (
    <CartProvider>
      <Router>
        <nav className="navbar">
          <div className="navbar-container">
            {/* Left side - Brand */}
            <div className="navbar-brand">
              <Link to="/" className="brand-link">
                Canteen
              </Link>
            </div>

            {/* Center - Navigation Links */}
            <div className="navbar-nav">
              <Link to="/" className="nav-link">Menu</Link>
              {authenticated && (
                <Link to="/history" className="nav-link">Order History</Link>
              )}
              {userIsAdmin && (
                <>
                  <Link to="/add-item" className="nav-link">Add Item</Link>
                  <Link to="/admin/orders" className="nav-link">Manage Orders</Link>
                </>
              )}
            </div>

            {/* Right side - User info and auth */}
            <div className="navbar-user">
              {authenticated && user ? (
                <div className="user-info">
                  <div className="user-details">
                    <span className="user-name">{user.name}</span>
                    <span className="user-role">
                      {user.role === 'admin' ? 'Admin' : 'Customer'}
                    </span>
                  </div>
                  <button onClick={logout} className="logout-btn">
                    Logout
                  </button>
                </div>
              ) : (
                <div className="auth-links">
                  <Link to="/login" className="nav-link">Login</Link>
                  <Link to="/register" className="nav-link">Register</Link>
                </div>
              )}
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/" element={<MenuPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          {/* Protected user routes */}
          <Route path="/history" element={
            <ProtectedRoute>
              <OrderHistoryPage />
            </ProtectedRoute>
          } />
          <Route path="/order-status/:id" element={
            <ProtectedRoute>
              <OrderStatusPage />
            </ProtectedRoute>
          } />
          {/* Admin only routes */}
          <Route path="/add-item" element={
            <ProtectedRoute adminOnly={true}>
              <AddItemPage />
            </ProtectedRoute>
          } />
          <Route path="/admin/orders" element={
            <ProtectedRoute adminOnly={true}>
              <AdminOrdersPage />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
    </CartProvider>
  );
}
export default App;