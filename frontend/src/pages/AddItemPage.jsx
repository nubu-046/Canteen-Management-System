import React, { useState } from 'react';
import { createMenuItem } from '../api';

const AddItemPage = () => {
  const [formData, setFormData] = useState({
    name: '', description: '', price: '', imageUrl: '', stock: '', category: '' // Add category to state
  });

  const { name, description, price, imageUrl, stock, category } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  
  const onSubmit = async e => {
    e.preventDefault();
    try {
      await createMenuItem(formData);
      alert('Menu item added successfully!');
      // Reset the form, including the new category field
      setFormData({ name: '', description: '', price: '', imageUrl: '', stock: '', category: '' });
    } catch (error) {
      alert('Failed to add item. ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container form-container">
      <h1>Add New Menu Item</h1>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Item Name" name="name" value={name} onChange={onChange} required />
        <input type="text" placeholder="Description" name="description" value={description} onChange={onChange} required />
        {/* Add the category input field here */}
        <input type="text" placeholder="Category (e.g., Snacks, Drinks)" name="category" value={category} onChange={onChange} required />
        <input type="number" placeholder="Price" name="price" value={price} onChange={onChange} required />
        <input type="text" placeholder="Image URL" name="imageUrl" value={imageUrl} onChange={onChange} required />
        <input type="number" placeholder="Stock" name="stock" value={stock} onChange={onChange} required />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddItemPage;