const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');
const startCancellationJob = require('./jobs/orderCancellation');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Add the new auth routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/menu', require('./routes/menuItemRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

// API Routes
app.use('/api/menu', require('./routes/menuItemRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  // Start the cron job
  startCancellationJob();
});