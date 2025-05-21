import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MongoItems from './components/MongoItems';
import RedisItems from './components/RedisItems';
import Neo4jItems from './components/Neo4jItems';
import './App.css'

function App() {
  return (
    <Router>
      <nav>
        <Link to="/mongo">MongoDB</Link> | 
        <Link to="/redis">Redis</Link> | 
        <Link to="/neo4j">Neo4j</Link>
      </nav>
      
      <Routes>
        <Route path="/mongo" element={<MongoItems />} />
        <Route path="/redis" element={<RedisItems />} />
        <Route path="/neo4j" element={<Neo4jItems />} />
      </Routes>
    </Router>
  );
}

export default App;