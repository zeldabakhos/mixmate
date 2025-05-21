import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Neo4jItems = () => {
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
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/neo4j`);
      setItems(response.data);
    } catch (error) {
      console.error('Error fetching Neo4j items:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await axios.put(`${process.env.REACT_APP_API_URL}/api/neo4j/${editingId}`, formData);
      } else {
        await axios.post(`${process.env.REACT_APP_API_URL}/api/neo4j`, formData);
      }
      fetchItems();
      setFormData({ name: '', description: '' });
      setEditingId(null);
    } catch (error) {
      console.error('Error saving Neo4j item:', error);
    }
  };

  const handleEdit = (item) => {
    setFormData({
      name: item.properties.name,
      description: item.properties.description
    });
    setEditingId(item.elementId);
  };

  const handleDelete = async (elementId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/neo4j/${elementId}`);
      fetchItems();
    } catch (error) {
      console.error('Error deleting Neo4j item:', error);
    }
  };

  return (
    <div className="database-container">
      <h2>Neo4j Items</h2>
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
        {items.map((item, index) => (
          <div key={index} className="item-card">
            <h3>{item.properties.name}</h3>
            <p>{item.properties.description}</p>
            <div className="item-actions">
              <button onClick={() => handleEdit(item)}>Edit</button>
              <button onClick={() => handleDelete(item.elementId)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Neo4jItems;