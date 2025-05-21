import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MongoItems = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/mongo`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/mongo/${editingId}`, formData);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/mongo`, formData);
      }
      fetchItems();
      setFormData({ name: '', description: '' });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.name,
      description: item.description
    });
    setEditingId(item._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/mongo/${id}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  return (
    <div className="database-container">
      <h2>MongoDB Items</h2>
      <form onSubmit={handleSubmit} className="item-form">
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
          placeholder="Name"
          required
        />
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({...formData, description: e.target.value})}
          placeholder="Description"
          required
        />
        <button type="submit">
          {editingId ? 'Update Item' : 'Add Item'}
        </button>
        {editingId && (
          <button type="button" onClick={() => {
            setFormData({ name: '', description: '' });
            setEditingId(null);
          }}>
            Cancel
          </button>
        )}
      </form>

      <div className="items-list">
        {items.map(item => (
          <div key={item._id} className="item-card">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <div className="item-actions">
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MongoItems;