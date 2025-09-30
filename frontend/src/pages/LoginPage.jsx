import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api'; // Import the login function from your api/index.js

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate(); // Hook for programmatically navigating

  const { email, password } = formData;

  // Update state as user types
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  // Handle form submission
  const onSubmit = async e => {
    e.preventDefault();
    try {
      // 1. Call the login API function with the form data
      const { data } = await login(formData);
      
      // 2. If successful, save the returned token to the browser's local storage
      localStorage.setItem('token', data.token);

      // 3. Notify the user and redirect to the main menu page
      alert('Login successful!');
      navigate('/');
      
      // 4. Force a page reload to ensure all components (like the navbar) update their state
      window.location.reload();

    } catch (error) {
      // 5. If login fails, display the error message from the backend
      const errorMessage = error.response?.data?.message || 'Login failed. Please check your credentials.';
      alert(errorMessage);
    }
  };

  return (
    <div className="container form-container">
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input 
          type="email" 
          placeholder="Email Address" 
          name="email" 
          value={email} 
          onChange={onChange} 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          name="password" 
          value={password} 
          onChange={onChange} 
          required 
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;