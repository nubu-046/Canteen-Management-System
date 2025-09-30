import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../api'; // Import the register function from your api file

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate(); // Hook for redirection

  const { name, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const onSubmit = async e => {
    e.preventDefault();
    try {
      // 1. Call the API
      const { data } = await register(formData);
      
      // 2. Save the received token to local storage
      localStorage.setItem('token', data.token);

      // 3. Notify user and redirect to the main menu
      alert('Registration successful!');
      navigate('/');
      window.location.reload(); // Force a reload to update the navbar

    } catch (error) {
      // 4. Handle errors (e.g., user already exists)
      const errorMessage = error.response?.data?.message || 'Registration failed. Please try again.';
      alert(errorMessage);
    }
  };

  return (
    <div className="container form-container">
      <h1>Register</h1>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} required />
        <input type="email" placeholder="Email Address" name="email" value={email} onChange={onChange} required />
        <input type="password" placeholder="Password" name="password" value={password} onChange={onChange} minLength="6" required />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;