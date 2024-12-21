require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Connected!'))
  .catch((err) => console.error("Error connecting to MongoDB:", err));