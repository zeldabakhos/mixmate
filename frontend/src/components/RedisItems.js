import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RedisItems = () => {
  const [items, setItems] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    description: ''
  });
  const [editingKey, setEditingKey] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/redis`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching Redis items:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingKey) {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/redis/${editingKey}`, formData);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/redis`, formData);
      }
      fetchItems();
      setFormData({ id: '', name: '', description: '' });
      setEditingKey(null);
    } catch (error) {
      console.error('Error saving Redis item:', error);
    }
  };

  const handleEdit = (key, item) => {
    setFormData({
      id: item.id || '',
      name: item.name || '',
      description: item.description || ''
    });
    setEditingKey(key.split(':')[1]); // Extract ID from Redis key format "item:123"
  };

  const handleDelete = async (key) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/redis/${key.split(':')[1]}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting Redis item:', error);
    }
  };

  return (
    <div className="database-container">
      <h2>Redis Items</h2>
      <form onSubmit={handleSubmit} className="item-form">
        {!editingKey && (
          <input
            type="text"
            value={formData.id}
            onChange={(e) => setFormData({...formData, id: e.target.value})}
            placeholder="ID"
            required
          />
        )}
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
          {editingKey ? 'Update Item' : 'Add Item'}
        </button>
        {editingKey && (
          <button type="button" onClick={() => {
            setFormData({ id: '', name: '', description: '' });
            setEditingKey(null);
          }}>
            Cancel
          </button>
        )}
      </form>

      <div className="items-list">
        {items.map((item, index) => {
          const key = Object.keys(item)[0];
          const value = item[key];
          return (
            <div key={index} className="item-card">
              <h3>{value.name || 'No name'}</h3>
              <p>{value.description || 'No description'}</p>
              <div className="item-actions">
                <button onClick={() => handleEdit(key, value)}>Edit</button>
                <button onClick={() => handleDelete(key)}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RedisItems;