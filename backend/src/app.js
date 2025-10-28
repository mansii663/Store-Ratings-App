const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/db');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); 

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const storeRoutes = require('./routes/storeRoutes');
app.use('/api/stores', storeRoutes);

const ratingRoutes = require('./routes/ratingRoutes');
app.use('/api/ratings', ratingRoutes);

app.get('/', (req, res) => {
  res.send('Store Ratings API is running.');
});

module.exports = app;
