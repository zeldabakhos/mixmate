require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectMongo = require('./config/mongo');
const redisClient = require('./config/redis');
const neo4jDriver = require('./config/neo4j');

const app = express();

app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/users");
const drinkRoutes = require("./routes/drinks");
const ingredientRoutes = require("./routes/ingredients");

// Mount routes
app.use("/api/users", userRoutes);
app.use("/api/drinks", drinkRoutes);
app.use("/api/ingredients", ingredientRoutes);

const PORT = process.env.PORT || 4000;

connectMongo().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
