const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const redis = require('redis');
const neo4j = require('neo4j-driver');

const userRoutes = require("./routes/users");
const drinkRoutes = require("./routes/drinks");
const ingredientRoutes = require("./routes/ingredients");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connections
const connectDB = async () => {
  try {
    // MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');
    
    // Redis
    const redisClient = redis.createClient({ url: process.env.REDIS_URI });
    await redisClient.connect();
    app.locals.redis = redisClient;
    console.log('Redis connected');
    
    // Neo4j
    const neo4jDriver = neo4j.driver(
      process.env.NEO4J_URI,
      neo4j.auth.basic(process.env.NEO4J_USER, process.env.NEO4J_PASSWORD)
    );
    app.locals.neo4j = neo4jDriver;
    console.log('Neo4j connected');
    
  } catch (err) {
    console.error('Database connection error:', err);
    process.exit(1);
  }
};

// Routes
app.use('/api/mongo', require('./routes/mongoRoutes'));
app.use('/api/redis', require('./routes/redisRoutes'));
app.use('/api/neo4j', require('./routes/neo4jRoutes'));
app.use("/api/users", userRoutes);
app.use("/api/drinks", drinkRoutes);
app.use("/api/ingredients", ingredientRoutes);

// Start server
const PORT = process.env.PORT || 4000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});

// CORS Middleware
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    next();
});

// Home route
app.get("/", (req, res) => {
    res.send("🍸 Welcome to the Mixology API - Make your drinks at home!");
});

// Connect to MongoDB
connectDB();