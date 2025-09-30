// Utility functions for authentication and token handling

export const decodeToken = (token) => {
  try {
    if (!token) return null;
    
    // JWT tokens have 3 parts separated by dots
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    
    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const getUserFromToken = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  const decoded = decodeToken(token);
  return decoded && decoded.user ? {
    id: decoded.user.id,
    name: decoded.user.name,
    email: decoded.user.email,
    role: decoded.user.role || 'user'
  } : null;
};

export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const isAdmin = () => {
  const user = getUserFromToken();
  return user && user.role === 'admin';
};

export const logout = () => {
  localStorage.removeItem('token');
  window.location.href = '/login';
};